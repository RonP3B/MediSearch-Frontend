// Imports
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import WebIcon from "@mui/icons-material/Web";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const CompanySocials = ({ webSite, facebook, instagram, twitter }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
      >
        Redes sociales
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          "@media (max-width: 380px)": {
            flexDirection: "column",
          },
        }}
      >
        {/* Conditionally render webSite section */}
        {webSite && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton href={webSite} target="_blank" sx={{ padding: 0 }}>
              <WebIcon sx={{ color: "#4caf50", fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">Página Web</Typography>
          </Box>
        )}

        {/* Conditionally render facebook section */}
        {facebook && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton href={facebook} target="_blank" sx={{ padding: 0 }}>
              <FacebookIcon sx={{ color: "#1877f2", fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">Facebook</Typography>
          </Box>
        )}

        {/* Conditionally render facebook section */}
        {instagram && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton href={instagram} target="_blank" sx={{ padding: 0 }}>
              <InstagramIcon sx={{ color: "#e4405f", fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">Instagram</Typography>
          </Box>
        )}

        {/* Conditionally render twitter section */}
        {twitter && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton href={twitter} target="_blank" sx={{ padding: 0 }}>
              <TwitterIcon sx={{ color: "#1da1f2", fontSize: 50 }} />
            </IconButton>
            <Typography variant="body2">Twitter</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
CompanySocials.propTypes = {
  webSite: PropTypes.string,
  facebook: PropTypes.string,
  instagram: PropTypes.string,
  twitter: PropTypes.string,
};

export default CompanySocials;
