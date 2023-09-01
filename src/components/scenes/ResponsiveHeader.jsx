// Imports
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import ColorModeContext from "../contexts/ColorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../hooks/persistence/useAuth";
import useLogout from "../../hooks/persistence/useLogout";

// Define the ASSETS constant using Vite's environment variable for media search
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ResponsiveHeader = ({ pages, settings, logged }) => {
  // Get the current color mode from the context
  const colorMode = useContext(ColorModeContext);

  // Set up state variables for navigation and user menus
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Access authentication data from the custom useAuth hook
  const { auth } = useAuth();

  // Access the logout function from the useLogout hook
  const logoutUser = useLogout();

  // Event handlers to open navigation and user menus
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  // Event handlers to close navigation and user menus
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Event handler to toggle color mode
  const handleToggleColorMode = () => colorMode.toggleColorMode();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and title */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MediSearch
          </Typography>

          {/* Navigation menu for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* Hamburger icon to toggle navigation menu */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* Navigation menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Mapping over pages to create menu items */}
              {pages.map(({ page, route }) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to={route}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo and title (small screens) */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MediSearch
          </Typography>

          {/* Navigation buttons (large screens) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Mapping over pages to create navigation buttons */}
            {pages.map(({ page, route }) => (
              <Button
                key={page}
                component={Link}
                to={route}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Color mode toggle button and user account section */}
          <Box sx={{ flexGrow: 0 }}>
            {/* Toggle color mode button */}
            <IconButton onClick={handleToggleColorMode} color="inherit">
              {colorMode.mode === "light" ? (
                <Brightness4Icon />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>

            {/* User account section */}
            {settings && (
              <>
                {/* Tooltip and user menu */}
                <Tooltip title="Abrir opciones">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {logged ? (
                      // Display user avatar if logged in
                      <Avatar
                        alt="Foto del usuario"
                        src={`${ASSETS}${auth.payload.UrlImage}`}
                      />
                    ) : (
                      // Display account icon if not logged in
                      <AccountCircleIcon />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* Display user information if logged in */}
                  {logged && (
                    <Box sx={{ my: 1.5, px: 2.5 }}>
                      <Typography variant="subtitle2" noWrap>
                        {auth.payload.sub}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                      >
                        {auth.payload.email}
                      </Typography>
                    </Box>
                  )}

                  {
                    // Conditionally render a Divider component if 'logged' is true
                    logged && <Divider sx={{ borderStyle: "dashed" }} />
                  }

                  {/* Mapping over the 'settings' array */}
                  {settings.map(({ option, route, Icon }) => (
                    // Create a MenuItem for each item in 'settings'
                    <MenuItem
                      key={option}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to={route}
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      {/* Display an icon related to the option */}
                      <ListItemIcon>
                        <Icon fontSize="small" />
                      </ListItemIcon>
                      {/* Display the option text */}
                      <Typography textAlign="center">{option}</Typography>
                    </MenuItem>
                  ))}

                  {/* Conditionally render a Divider component if 'logged' is true */}
                  {logged && <Divider />}

                  {/* Conditionally render a MenuItem for logging out if 'logged' is true */}
                  {logged && (
                    <MenuItem onClick={logoutUser}>
                      {/* Display a logout icon */}
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      {/* Display the logout option text */}
                      <Typography textAlign="center">Cerrar sesión</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Define PropTypes to specify expected props and their types
ResponsiveHeader.propTypes = {
  pages: PropTypes.array.isRequired,
  settings: PropTypes.array,
  logged: PropTypes.bool.isRequired,
};

export default ResponsiveHeader;
