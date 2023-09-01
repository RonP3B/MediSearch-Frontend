// Imports
import { useState, useEffect, useRef } from "react";
import { alpha } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import useAuth from "../../hooks/persistence/useAuth";
import ScrollBar from "../custom/Scrollbar/ScrollBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircularProgress from "@mui/material/CircularProgress";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MessageBox from "../custom/Chat/MessageBox";
import NoChats from "../custom/Chat/NoChat";
import NewChatForm from "../custom/Forms/NewChatForm";
import {
  getChat,
  getChats,
  sendMessage,
} from "../../services/MediSearchServices/ChatServices";

// Retrieves the asset URL from Vite's environment variables
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const Chat = ({ isCompany }) => {
  // Extracts the 'auth' object from the custom hook 'useAuth', which likely provides authentication-related data
  const { auth } = useAuth();

  // Retrieves the search parameters from the current URL
  const [searchParams] = useSearchParams();

  // States
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgToSend, setMsgToSend] = useState("");
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingChatMessages, setLoadingChatMessages] = useState(false);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [filterChat, setFilterChat] = useState("");
  const [pollingId, setPollingId] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  // Retrieves a function 'showToast' to display toast notifications
  const showToast = useToast();

  // Creates a reference to the 'showToast' function using useRef
  const showToastRef = useRef(showToast);

  // Creates a reference to a scroll bar element, likely for scrolling purposes
  const scrollBarRef = useRef(null);

  // Creates a reference to a file input element, likely for file uploading
  const fileInputRef = useRef(null);

  // Checks if the screen width is below 900px using a media query
  const isScreenBelow900px = useMediaQuery("(max-width:899px)");

  // Retrieves the 'receiverId' from the search parameters in the URL
  const receiverId = searchParams.get("receiverId");

  // Retrieves the 'product' from the search parameters in the URL
  const product = searchParams.get("product");

  // Sets 'defaultMessage' to 'true' if both 'receiverId' and 'product' are available, otherwise 'false'
  const defaultMessage = receiverId && product;

  useEffect(() => {
    // Define an asynchronous function to fetch chat data
    const fetchChats = async () => {
      try {
        // If there's a defaultMessage, send a predefined message
        if (defaultMessage) {
          await sendMessage({
            idReceiver: receiverId,
            content: `¡Buenas! Estoy interesado en su producto '${product}'`,
          });
        }

        // Fetch the chats data from the server
        const res = await getChats();
        const chatsArr = res.data;

        // Update the state with the fetched chat data
        setChats(chatsArr);

        // If there's a defaultMessage, select the chat associated with the receiverId
        defaultMessage &&
          setSelectedChat(
            chatsArr.find((chat) => chat.receiverId === receiverId)
          );
      } catch (error) {
        // Ignored errors
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;

        // Show an error toast if there's any other error
        showToastRef.current(
          "Ocurrió un error al cargar la sección de chats, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        // Set loading state to false regardless of success or error
        setLoadingChats(false);
      }
    };

    fetchChats();
  }, [defaultMessage, product, receiverId]);

  // This useEffect block is responsible for fetching chat messages and setting up polling when a new chat is selected.
  useEffect(() => {
    const handleChatSelection = async () => {
      try {
        setLoadingChatMessages(true);

        // Fetch chat messages for the selected chat
        const res = await getChat(selectedChat.id);
        setMessages(res.data.messages);

        // Set up polling to fetch new messages at regular intervals
        const pollingId = setInterval(async () => {
          await getMessagesByPolling(selectedChat);
        }, 10000);

        // Store the polling ID to clear it later
        setPollingId(pollingId);
      } catch (error) {
        showToastRef(
          "Ocurrió un error al obtener el chat, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoadingChatMessages(false);
      }
    };

    // If a selected chat exists, trigger the chat selection handler
    selectedChat && handleChatSelection();
  }, [selectedChat]);

  // This useEffect block is responsible for scrolling the chat window to the latest message.
  useEffect(() => {
    const current = scrollBarRef.current;

    if (current) {
      // Scroll to the bottom of the chat window to display the latest message
      const scrollElement = current?.contentWrapperEl || current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  // This useEffect block cleans up the polling interval when the component unmounts.
  useEffect(() => {
    return () => {
      // Clear the polling interval when the component unmounts
      clearInterval(pollingId);
    };
  }, [pollingId]);

  // Filter chats based on a filter criteria
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(filterChat.toLowerCase())
  );

  // Filter chats based on a filter criteria
  const openNewChatModal = () => {
    setModalOpened(true);
  };

  // Function to handle going back from a chat view
  const handleArrowBack = () => {
    setSelectedChat(null);
    clearInterval(pollingId);
  };

  // Get the hour in 'hh:mm' format from a given date
  const getHour = (dateVal) => {
    const date = new Date(dateVal);
    return `${date.toISOString().substring(11, 16)}`;
  };

  // Function to send a message
  const sendMsg = async (msg) => {
    try {
      // Determine if the message is a file or text
      const isFile = typeof msg === "object";

      // Prepare the message payload
      const values = { idReceiver: selectedChat.receiverId };
      values[isFile ? "file" : "content"] = msg;

      // Set sending message state to true
      setSendingMsg(true);

      // Send the message and receive a response
      const res = await sendMessage(values);

      // Update the messages state with the new message
      setMessages((currArr) => [res.data, ...currArr]);

      // Clear the message input if it's not a file
      !isFile && setMsgToSend("");
    } catch (error) {
      showToast(
        "Ocurrió un error al enviar el mensaje, informelo al equipo técnico",
        { type: "error" }
      );
    } finally {
      setSendingMsg(false);
    }
  };

  // Function to fetch messages through polling
  const getMessagesByPolling = async (chat) => {
    try {
      // Fetch messages for the given chat
      const res = await getChat(chat.id);

      // Extract new messages from the response
      const newMessages = res.data.messages;

      // Update the messages state if there are new messages
      setMessages((prevMessages) => {
        if (newMessages.length > prevMessages.length) {
          return newMessages;
        }
        return prevMessages;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Chat
        </Typography>
        <Button
          onClick={openNewChatModal}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nuevo mensaje
        </Button>
        <NewChatForm
          open={modalOpened}
          handleClose={() => setModalOpened(false)}
          handleChatSelection={setSelectedChat}
          chats={chats}
          setChats={setChats}
        />
      </Stack>
      <Grid container component={Paper} sx={{ width: "100%", height: "75vh" }}>
        <Grid
          item
          xs={!isScreenBelow900px ? 3.8 : selectedChat ? 0 : 12}
          sx={{
            borderRight: isScreenBelow900px
              ? "none"
              : (theme) => `1px solid ${theme.palette.grey[300]}`,
            display: isScreenBelow900px && selectedChat ? "none" : "block",
            maxHeight: "100%",
            overflow: "hidden",
          }}
        >
          {loadingChats && (
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
          )}
          {!loadingChats && chats.length > 0 ? (
            <>
              <Toolbar>
                <TextField
                  value={filterChat}
                  onChange={(e) => setFilterChat(e.target.value)}
                  label="Buscar"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: "25px" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Toolbar>
              <Box sx={{ height: "calc(100% - 63.98px)" }}>
                <ScrollBar>
                  <List>
                    {filteredChats.length > 0 ? (
                      filteredChats.map((chat) => (
                        <ListItem key={chat.id} disablePadding>
                          <ListItemButton
                            onClick={() => setSelectedChat(chat)}
                            selected={chat.id === selectedChat?.id}
                          >
                            <ListItemIcon>
                              <Avatar
                                alt={chat.name}
                                src={ASSETS + chat.image}
                                sx={{
                                  border: (theme) =>
                                    `1px solid ${theme.palette.primary.main}`,
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              sx={{ width: "70vw" }}
                              primary={
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {chat.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ fontSize: "0.7rem" }}
                                  >
                                    {getHour(chat.lastMessage.date)}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {chat.lastMessage.content || "Envió una foto"}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <NoChats
                        msg="No hay chats"
                        chatSection={false}
                        Icon={SpeakerNotesOffIcon}
                        handleButton={openNewChatModal}
                      />
                    )}
                  </List>
                </ScrollBar>
              </Box>
            </>
          ) : (
            <NoChats
              msg="No hay chats activos"
              chatSection={false}
              Icon={SpeakerNotesOffIcon}
              handleButton={openNewChatModal}
            />
          )}
        </Grid>
        <Grid
          item
          xs={!isScreenBelow900px ? 8.2 : selectedChat ? 12 : 0}
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
            display: isScreenBelow900px && !selectedChat ? "none" : "flex",
            flexDirection: "column",
          }}
        >
          {selectedChat ? (
            <>
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                  boxShadow: (theme) => theme.shadows[1],
                }}
              >
                <Toolbar>
                  {isScreenBelow900px && (
                    <IconButton onClick={handleArrowBack}>
                      <ArrowBackIcon />
                    </IconButton>
                  )}
                  <Avatar
                    alt={selectedChat.name}
                    src={ASSETS + selectedChat.image}
                    sx={{
                      mr: 1,
                      width: 50,
                      height: 50,
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <Typography variant="h6">{selectedChat.name}</Typography>
                </Toolbar>
              </Box>
              <Box
                sx={{
                  padding: 1,
                  flexGrow: 1,
                  overflowY: "auto",
                  height: 2,
                }}
              >
                {loadingChatMessages ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <ScrollBar customRef={scrollBarRef}>
                    {messages
                      .slice()
                      .reverse()
                      .map((message) => {
                        const isReceiver =
                          message.userId === selectedChat.receiverId;
                        const receiverImg = ASSETS + selectedChat.image;
                        const userImg = ASSETS + auth.payload.UrlImage;
                        const userName = auth.payload.sub;

                        return (
                          <MessageBox
                            key={message.id}
                            position={isReceiver ? "left" : "right"}
                            avatarSrc={isReceiver ? receiverImg : userImg}
                            name={isReceiver ? selectedChat.name : userName}
                            message={message.content}
                            messageImg={message.url}
                            time={getHour(message.date)}
                          />
                        );
                      })}
                  </ScrollBar>
                )}
              </Box>
              <Box sx={{ padding: 1 }}>
                <TextField
                  value={msgToSend}
                  onChange={(e) => setMsgToSend(e.target.value)}
                  multiline
                  fullWidth
                  label="Mensaje"
                  maxRows={6}
                  InputProps={{
                    sx: {
                      borderRadius: "25px",
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        {sendingMsg ? (
                          <CircularProgress size={25} />
                        ) : (
                          <>
                            <IconButton
                              color="primary"
                              disabled={!msgToSend}
                              onClick={() => sendMsg(msgToSend)}
                            >
                              <SendIcon />
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={() => fileInputRef.current.click()}
                            >
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => sendMsg(e.target.files[0])}
                />
              </Box>
            </>
          ) : (
            <NoChats
              msg="Selecciona un chat"
              chatSection={true}
              Icon={ChatBubbleOutlineIcon}
              handleButton={openNewChatModal}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
Chat.propTypes = {
  isCompany: PropTypes.bool.isRequired,
};

export default Chat;
