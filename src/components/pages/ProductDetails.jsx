// Imports
import { useState, useEffect, useRef } from "react";
import { alpha } from "@mui/material/styles";
import { useParams, useNavigate, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import { getCompanyProduct } from "../../services/MediSearchServices/HomeServices";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import CommentsAccordion from "../custom/Comments/CommentsAccordion";
import Comment from "../custom/Comments/Comment";
import CommentTextbox from "../custom/Comments/CommentTextbox";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import BusinessIcon from "@mui/icons-material/Business";
import {
  addComment,
  addReply,
} from "../../services/MediSearchServices/ProductServices";

// Store the asset URL from Vite environment variables
const ASSETS = import.meta.env.VITE_MEDISEARCH;

// Functional component to display product details
const ProductDetails = ({ logged, showCompanyInfo, isCompany }) => {
  // Get the 'id' parameter from the route
  const { id } = useParams();

  // Hooks to manage component state
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState({});
  const [activeReplyIndex, setActiveReplyIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [sendingComment, setSendingComment] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);

  // Notification toast functionality
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Fetch product details and related data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getCompanyProduct(id);
        setProduct(res.data);
        setImages(res.data.images.map((url) => ASSETS + url)); // Prepend ASSETS to image URLs
        setComments(res.data.comments);
      } catch (error) {
        // Ignored errors
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return navigate(-1);

        // Show error toast
        showToastRef.current(
          "Ocurrió un error al obtener la información del producto, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const sendComment = async (content, setTextboxVal) => {
    try {
      // Indicate that a comment is being sent
      setSendingComment(true);

      // Call an API to add the comment with provided content and product ID
      const res = await addComment({ content, productId: id });

      // Update the comments with the new comment from the API response
      setComments((prevComments) => [...prevComments, res.data]);

      // Show a success toast notification for adding a comment
      showToast("Comentario agregado", { type: "success" });

      // Clear the input textbox after submitting the comment
      setTextboxVal("");
    } catch (error) {
      // Show an error toast notification if adding a comment fails
      showToast(
        "Ocurrió un error al intentar comentar, informelo al equipo técnico",
        { type: "error" }
      );
    } finally {
      // Whether successful or not, reset the comment sending status
      setSendingComment(false);
    }
  };

  const sendReply = async (content, setTextboxVal, commentId) => {
    try {
      // Indicate that a reply is being sent
      setSendingReply(true);

      // Call an API to add a reply with provided content and comment ID
      const res = await addReply({ content, commentId });

      // Update the comments by adding the new reply to the corresponding comment
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === commentId) {
            // Add the new reply to the list of replies for the specific comment
            comment.replies.push(res.data);
          }
          return comment;
        });
      });

      // Show a success toast notification for adding a reply
      showToast("Respuesta agregada", { type: "success" });

      // Clear the input textbox after submitting the reply
      setTextboxVal("");
    } catch (error) {
      // Show an error toast notification if adding a reply fails
      showToast(
        "Ocurrió un error al intentar responder, informelo al equipo técnico",
        { type: "error" }
      );
    } finally {
      // Whether successful or not, reset the reply sending status
      setSendingReply(false);
    }
  };

  // Transform images for use with a gallery component
  const imagesArr = images.map((image) => {
    return { original: image, thumbnail: image };
  });

  // Information about the product to display
  const productInfo = [
    { label: "Nombre:", value: product.name },
    { label: "Precio:", value: `RD$ ${product.price}` },
    { label: "Cantidad disponible:", value: product.quantity },
    { label: "Clasificación:", value: product.classification },
    {
      label: "Categorías:",
      value: product.categories?.map((category) => category).join(", "),
    },
    { label: "Descripción:", value: product.description },
  ];

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      {/* Back button */}
      <Button
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>

      {/* Product title */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {product.name}
        </Typography>
      </Box>

      {loading ? (
        // Loading indicator
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              {/* Checks if the product has more the one image */}
              {images.length > 1 ? (
                // Displays multiple images
                <Box className="custom-gallery-container">
                  <ImageGallery items={imagesArr} />
                </Box>
              ) : (
                // Displays a single image
                <Box
                  component="img"
                  src={images[0]}
                  sx={{
                    border: "2px solid",
                    borderColor: "primary.main",
                    minHeight: "200px",
                    minWidth: "200px",
                    maxHeight: "470px",
                    maxWidth: "100%",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} sx={{ overflowWrap: "anywhere" }}>
              {/* Divider when company info is hidden */}
              {!showCompanyInfo && (
                <Divider sx={{ my: 1, display: { md: "none" } }} />
              )}

              {/* Company information */}
              {showCompanyInfo && (
                <>
                  <Box
                    sx={{
                      border: (theme) =>
                        `3px solid ${theme.palette.primary.main}`,
                      borderRadius: "12px",
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.light, 0.1),
                      maxWidth: 500,
                      margin: "0 auto",
                      padding: 1.5,
                    }}
                  >
                    {/* Company details */}
                    <Box display="flex">
                      <Avatar
                        alt="Foto de la empresa"
                        src={`${ASSETS}${product.logo}`}
                        sx={{
                          border: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                          width: 80,
                          height: 80,
                        }}
                      />
                      <Box ml={2}>
                        <Typography variant="h5">
                          {product.nameCompany}
                        </Typography>
                        <Typography variant="body2">
                          {product.province}, {product.municipality}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Button to start a chat */}
                    {logged && (
                      <Button
                        component={Link}
                        to={`/${
                          isCompany ? "company" : "client"
                        }/chat?receiverId=${product.companyId}&product=${
                          product.name
                        }`}
                        fullWidth
                        variant="contained"
                        startIcon={<MarkUnreadChatAltIcon />}
                        sx={{ mt: 1 }}
                      >
                        Chatear con el vendedor
                      </Button>
                    )}

                    {/* Button to view seller's profile */}
                    <Button
                      component={Link}
                      to={`/${
                        isCompany
                          ? "company"
                          : logged
                          ? "client/companies"
                          : "companies"
                      }/company-details/${product.companyId}`}
                      fullWidth
                      variant="outlined"
                      startIcon={<BusinessIcon />}
                      sx={{ mt: 1 }}
                    >
                      Ver perfil del vendedor
                    </Button>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                </>
              )}

              {/* Display product information */}
              {productInfo.map((info, index) => {
                const lastIndex = productInfo.length - 1;

                return (
                  <Box key={index}>
                    <Box
                      sx={{
                        mb: 1.5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        sx={{
                          letterSpacing: "0.1rem",
                          mr: 0.75,
                          fontWeight: "bold",
                        }}
                        label={info.label}
                        color="primary"
                      />
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {info.value}
                      </Typography>
                    </Box>
                    {lastIndex !== index && <Divider sx={{ my: 1 }} />}
                  </Box>
                );
              })}

              {/* Divider when screen is smaller */}
              <Divider sx={{ my: 1, display: { md: "none" } }} />
            </Grid>
          </Grid>

          {/* Comments section */}
          <CommentsAccordion>
            {/* Comment input box */}
            {logged && (
              <CommentTextbox
                label="Escribe un comentario"
                sx={{ mb: 1 }}
                onClick={sendComment}
                show={true}
                sendingComment={sendingComment}
              />
            )}

            {/* Display comments */}
            {comments.length > 0 ? (
              comments.map((comment, index) => {
                const replies = comment.replies;
                const showReplyTextBox = activeReplyIndex === index;

                return (
                  <Box key={comment.id}>
                    <Comment
                      userName={comment.ownerName}
                      userAvatar={`${ASSETS}${comment.ownerImage}`}
                      onClick={() =>
                        activeReplyIndex === index
                          ? setActiveReplyIndex(-1)
                          : setActiveReplyIndex(index)
                      }
                      comment={comment.content}
                      isReply={false}
                      logged={logged}
                    />
                    <Box sx={{ ml: "2rem" }}>
                      {/* Reply input box */}
                      {logged && (
                        <CommentTextbox
                          label="Escribe una respuesta"
                          sx={{ mb: 1.5 }}
                          onClick={sendReply}
                          show={showReplyTextBox}
                          sendingComment={sendingReply}
                          parentCommentId={comment.id}
                        />
                      )}

                      {/* Display replies */}
                      {replies.length > 0 &&
                        replies.map((reply) => (
                          <Comment
                            key={reply.id}
                            userName={reply.ownerName}
                            userAvatar={`${ASSETS}${reply.ownerImage}`}
                            comment={reply.content}
                            isReply={true}
                            logged={logged}
                          />
                        ))}
                    </Box>
                  </Box>
                );
              })
            ) : (
              // No comments message
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CommentsDisabledIcon
                  sx={{ fontSize: 75, color: "primary.main" }}
                />
                <Typography variant="body2">No hay comentarios</Typography>
              </Box>
            )}
          </CommentsAccordion>
        </>
      )}
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
ProductDetails.propTypes = {
  logged: PropTypes.bool.isRequired,
  showCompanyInfo: PropTypes.bool.isRequired,
  isCompany: PropTypes.bool.isRequired,
};

export default ProductDetails;
