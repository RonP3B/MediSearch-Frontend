// Imports
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {
  addCompanyFav,
  addProductFav,
  removeCompanyFav,
  removeProductFav,
} from "../../../services/MediSearchServices/HomeServices";

const CustomCard = (props) => {
  // Destructuring props
  const {
    to,
    maintenance,
    handleDelete,
    image,
    name,
    cardInfo,
    id,
    favorite,
    favoritesManager,
  } = props;

  const [loading, setLoading] = useState(false); // State to manage loading state
  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox state

  // Effect to update isChecked state based on the favorite prop
  useEffect(() => {
    // Updates 'isChecked' to be true if 'favorite.isFavorite' is true, otherwise false
    setIsChecked(favorite?.isFavorite ?? false);
  }, [favorite]);

  // Function to handle checkbox change (adding/removing favorites)
  const handleCheckboxChange = async () => {
    try {
      // Determines if the favorite type is a company or a product
      const isFavCompany = favorite.favoriteType === "company";

      // Determines the property name based on the favorite type
      const idProp = isFavCompany ? "companyId" : "productId";

      // Chooses the appropriate function for adding favorites based on type
      const addFavFunction = isFavCompany ? addCompanyFav : addProductFav;

      // Chooses the appropriate function for removing favorites based on type
      const removeFavFunction = isFavCompany
        ? removeCompanyFav
        : removeProductFav;

      // Sets loading state to indicate a pending operation
      setLoading(true);

      // Invokes the corresponding add or remove function based on isChecked state
      const res = await (isChecked
        ? removeFavFunction(id)
        : addFavFunction({ [idProp]: id }));

      // If the response contains the updated ID and favoritesManager is available
      if (res.data?.[idProp] && favoritesManager) {
        // Updates the favorites list in favoritesManager by removing the ID
        favoritesManager.setter((prev) =>
          prev.filter((val) => val.id !== res.data?.[idProp])
        );
      }

      // Toggles the isChecked state (checkbox state)
      setIsChecked(!isChecked);
    } catch (error) {
      console.error(error);
    } finally {
      // Regardless of success or failure, set loading state back to false
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: "0 auto",
        borderRadius: "12px",
        boxShadow: 3,
      }}
    >
      <CardMedia component="img" height="200" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {name}
        </Typography>
        {cardInfo.map((info, index) => (
          <Typography key={index} variant="body2" color="text.secondary" noWrap>
            {info.label}: {info.val}
          </Typography>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Displays maintenance options if 'maintenance' is true */}
          {maintenance && (
            <Box>
              <IconButton
                aria-label="Editar"
                component={Link}
                to={`edit/${id}`}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Eliminar"
                onClick={() => handleDelete(id)}
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          {loading ? (
            // Displays loading spinner if 'loading' is true
            <CircularProgress size={24} />
          ) : (
            favorite && (
              // Displays a heart shaped checkbox if 'favorite' is true
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            )
          )}
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              component={Link}
              to={to}
              variant="contained"
              startIcon={<InfoIcon />}
            >
              Detalles
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Define PropTypes to specify expected props and their types
CustomCard.propTypes = {
  to: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cardInfo: PropTypes.array.isRequired,
  maintenance: PropTypes.bool.isRequired,
  favorite: PropTypes.any.isRequired,
  handleDelete: PropTypes.func,
  favoritesManager: PropTypes.object,
};

export default CustomCard;
