// Imports
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditProfileForm from "../custom/Forms/EditProfileForm";
import {
  getLoggedCompanyProfile,
  getLoggedProfile,
} from "../../services/MediSearchServices/AdminServices";
import useToast from "../../hooks/feedback/useToast";
import useAuth from "../../hooks/persistence/useAuth";
import CompanySocials from "../custom/Socials/CompanySocials";

// Define the ASSETS constant using the VITE_MEDISEARCH variable from the import.meta.env object
const ASSETS = import.meta.env.VITE_MEDISEARCH;

// The Profile component is used to display user profiles, customized based on profileType, isCompany, and isClient flags
const Profile = ({ profileType, isCompany, isClient }) => {
  // Access the authentication context using the useAuth() hook
  const { auth } = useAuth();

  // State variables to manage various aspects of the component
  const [open, setOpen] = useState(false); // Control the open/close state of a dialog
  const [loading, setLoading] = useState(true); // Indicates whether data is being loaded
  const [profile, setProfile] = useState(null); // Stores the profile data
  const [edited, setEdited] = useState(0); // Keeps track of the number of times the profile has been edited
  const [profileInfo, setProfileInfo] = useState([]); // Stores an array of profile information
  const showToast = useToast(); // Access the toast notification functionality
  const showToastRef = useRef(showToast); // Create a reference to the showToast function

  // Fetch and populate profile data when the component mounts or when certain dependencies change
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Determine if the profile belongs to a company
        const isCompany = profileType === "empresa";

        // Fetch the appropriate profile data based on the profile type
        const res = await (isCompany
          ? getLoggedCompanyProfile()
          : getLoggedProfile());

        // Get respoonse data
        const data = res.data;

        // Create an array of profile information to display
        const info = [
          {
            label: "Nombre",
            val: isCompany ? data.name : `${data.firstName} ${data.lastName}`,
          },
          { label: "Dirección", val: data.address },
          { label: "Municipio", val: data.municipality },
          { label: "Provincia", val: data.province },
          {
            label: "Correo electrónico",
            val: isCompany ? data.email : auth.payload.email,
          },
        ];

        // Add additional information if the profile is a company or not
        if (isCompany) {
          info.push({ label: "Ceo", val: data.ceo });
          info.push({ label: "Teléfono", val: data.phone });
        }

        if (!isCompany) {
          info.push({ label: "Usuario", val: auth.payload.sub });
          !isClient && info.push({ label: "Rol", val: auth.payload.roles });
        }

        // Update the state with fetched data and profile information
        setProfile(data);
        setProfileInfo(info);
      } catch (error) {
        // Ignored error
        if (error.response?.data?.Error === "ERR_JWT") return;

        // Show error toast
        showToastRef.current(
          `Ocurrió un error al obtener la información de ${profileType}, informelo al equipo técnico`,
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [
    edited,
    profileType,
    auth.payload.email,
    auth.payload.sub,
    auth.payload.roles,
    isClient,
  ]);

  // Determine if the company profile has associated social media accounts
  const hasSocials =
    profileType === "empresa" &&
    profile &&
    (profile.webSite ||
      profile.facebook ||
      profile.twitter ||
      profile.instagram);

  // Event handlers for opening and closing a dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      {/* Container for the profile information */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Mi {profileType}
        </Typography>
        {!loading && profile && (
          <>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleClickOpen}
            >
              Editar {profileType}
            </Button>
            <EditProfileForm
              open={open}
              handleClose={handleClose}
              profile={profile}
              setEdited={setEdited}
              profileType={profileType}
            />
          </>
        )}
      </Stack>

      {/* Loading state or profile information */}
      {loading || !profile ? (
        // Loading state
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
        // Displaying the profile information
        <>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              {/* Profile avatar */}
              <Box
                component="img"
                sx={{
                  height: 250,
                  width: 250,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: "primary.main",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                alt="Avatar"
                src={`${ASSETS}${profile.urlImage}`}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                {/* Displaying profile information */}
                {profileInfo.map(({ label, val }, index) => {
                  const lastIndex = profileInfo.length - 1;
                  return (
                    <Box key={index}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ fontWeight: "normal" }}
                      >
                        <strong>{label}:</strong> {val}
                      </Typography>
                      {lastIndex !== index && <Divider sx={{ my: 1 }} />}
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>

          {/* Displaying social media links if available */}
          {hasSocials && (
            <CompanySocials
              webSite={profile.webSite}
              facebook={profile.facebook}
              instagram={profile.instagram}
              twitter={profile.twitter}
            />
          )}
        </>
      )}
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
Profile.propTypes = {
  profileType: PropTypes.string.isRequired,
  isCompany: PropTypes.bool.isRequired,
  isClient: PropTypes.bool.isRequired,
};

export default Profile;
