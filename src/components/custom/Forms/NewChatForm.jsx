// Imports
import { useState, useEffect, useRef } from "react";
import { getAllCompanies } from "../../../services/MediSearchServices/HomeServices";
import {
  getChats,
  sendMessage,
} from "../../../services/MediSearchServices/ChatServices";
import useToast from "../../../hooks/feedback/useToast";
import useAuth from "../../../hooks/persistence/useAuth";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SubmitButton from "../Buttons/SubmitButton";
import ScrollBar from "../Scrollbar/ScrollBar";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import CircularProgress from "@mui/material/CircularProgress";

// Gets the ASSETS URL from environment variables for images
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const NewChatForm = ({
  open,
  handleClose,
  handleChatSelection,
  chats,
  setChats,
}) => {
  // Extracts 'auth' object from the custom 'useAuth' hook
  const { auth } = useAuth();

  // Extracts user's role type and company name from 'auth' payload
  const userType = auth.payload.RoleType;
  const userCompanyName = auth.payload.Company;

  // Access the 'useToast' hook to show toast notifications and crates a reference
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Initializes states
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  // Fetches companies based on user's company name and role type
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);

        // Fetches a list of all companies
        const res = await getAllCompanies();
        const companiesArr = res.data;

        // Filters out companies based on specific conditions
        const filteredCompanies = companiesArr.filter((company) => {
          const isSameCompany = company.name === userCompanyName;
          const isSameCompanyType = company.type === userType;
          const isUserClient = userType === "Cliente";
          const isCompanyLaboratory = company.type === "Laboratorio";

          // Exclude companies that match the conditions
          if (
            isSameCompany ||
            isSameCompanyType ||
            (isUserClient && isCompanyLaboratory)
          ) {
            return false;
          }

          return true;
        });

        // Update the 'companies' state with the filtered list
        setCompanies(filteredCompanies);
      } catch (error) {
        // Ignored exception cases
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;

        // Show a toast notification for error
        showToastRef.current(
          "Ocurrió un error al obtener las empresas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, [userCompanyName, userType]);

  // Filters companies based on the entered company name
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(companyName.toLowerCase())
  );

  // Handles the selection of a company
  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
  };

  // Handles the submission of a new chat message
  const handleSubmit = async () => {
    try {
      setLoadingSubmit(true);

      // Sends a new message to the selected company
      await sendMessage({
        idReceiver: selectedCompany.id,
        content: message,
      });

      // Fetches updated list of chats
      const res = await getChats();
      const chatsRes = res.data;

      // Finds the chat that matches the selected company
      const chat = chatsRes.find(
        (chat) => chat.receiverId === selectedCompany.id
      );

      // Updates the chats if a new chat has been added
      if (chatsRes.length > chats.length) {
        setChats(chatsRes);
      }

      // Selects the chat for display
      handleChatSelection(chat);

      // Resets form values and close the form
      setCompanyName("");
      setSelectedCompany(null);
      setMessage("");
      handleClose();
    } catch (error) {
      // Show a toast notification for error
      showToast(
        "Ocurrió un error al enviar nuevo mensaje, informelo al equipo técnico",
        { type: "error" }
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "600px",
        },
      }}
    >
      <DialogTitle>Enviar mensaje</DialogTitle>
      <Divider />
      <ScrollBar>
        <DialogContent>
          {
            // Conditional rendering if selectedCompany is false
            !selectedCompany && (
              <>
                <TextField
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  label="Buscar empresa"
                  margin="dense"
                  variant="standard"
                  fullWidth
                />
                <Paper sx={{ height: 200, overflow: "auto", my: 2 }}>
                  {
                    // Displays loading spinner if loadingCompanies is true
                    loadingCompanies && (
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          height: "100%",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    )
                  }
                  {
                    // Displays list of companies if loadingCompanies is false
                    !loadingCompanies && (
                      <ScrollBar>
                        <List>
                          {
                            // If no companies match the filter
                            filteredCompanies.length === 0 ? (
                              <Box
                                sx={{
                                  display: "grid",
                                  placeItems: "center",
                                }}
                              >
                                <DomainDisabledIcon
                                  sx={{
                                    mt: 4,
                                    fontSize: 100,
                                    color: "primary.main",
                                  }}
                                />
                              </Box>
                            ) : (
                              //  Renders each company
                              filteredCompanies.map((company) => (
                                <ListItem key={company.id} disablePadding>
                                  <ListItemButton
                                    onClick={() =>
                                      handleCompanySelection(company)
                                    }
                                  >
                                    <ListItemIcon>
                                      <Avatar
                                        src={ASSETS + company.urlImage}
                                        alt={company.name}
                                      />
                                    </ListItemIcon>
                                    <ListItemText primary={company.name} />
                                  </ListItemButton>
                                </ListItem>
                              ))
                            )
                          }
                        </List>
                      </ScrollBar>
                    )
                  }
                </Paper>
              </>
            )
          }

          {
            //Conditional rendering if selectedCompany is true
            selectedCompany && (
              <>
                {/* Button to go back and clear the selected company */}
                <Button
                  startIcon={<KeyboardBackspaceIcon />}
                  onClick={() => {
                    setSelectedCompany(null);
                    setMessage("");
                  }}
                  sx={{ mb: 2 }}
                >
                  Volver
                </Button>
                {/* Input field to write a message to the selected company */}
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  multiline
                  label={`Escribe a ${selectedCompany.name}`}
                  margin="dense"
                  variant="standard"
                  fullWidth
                  maxRows={8}
                />
              </>
            )
          }
        </DialogContent>
      </ScrollBar>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <SubmitButton
          text="Enviar"
          loadingText="Enviando..."
          loading={loadingSubmit}
          onClick={handleSubmit}
          disabled={!(selectedCompany && message.trim())}
        />
      </DialogActions>
    </Dialog>
  );
};

// Define PropTypes to specify expected props and their types
NewChatForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChatSelection: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired,
  setChats: PropTypes.func.isRequired,
};

export default NewChatForm;
