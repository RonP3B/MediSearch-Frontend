// Imports
import { useState, useContext, useEffect } from "react";
import ColorModeContext from "../contexts/ColorModeContext";
import PropTypes from "prop-types";
import useAuth from "../../hooks/persistence/useAuth";
import useLogout from "../../hooks/persistence/useLogout";
import ScrollBar from "../custom/Scrollbar/ScrollBar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/images/Logo.png";
import Avatar from "@mui/material/Avatar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";

// Define the ASSETS constant using Vite's environment variable for media search
const ASSETS = import.meta.env.VITE_MEDISEARCH;

// Define the width of the drawer for the responsive layout
const drawerWidth = 280;

// Define the ResponsiveDrawer component
const ResponsiveDrawer = (props) => {
  // Destructure props to access specific values
  const { window, main, nav, settings } = props;

  // State for controlling mobile drawer open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  // Access the color mode context
  const colorMode = useContext(ColorModeContext);

  // State for controlling the user menu anchor element
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Access authentication data using a custom hook
  const { auth } = useAuth();

  // Access the logout function using a custom hook
  const logoutUser = useLogout();

  // Access the current location using React Router's useLocation hook
  const location = useLocation();
  const { pathname } = useLocation();

  // Effect to close the mobile drawer when the pathname changes
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Event handler to open the user menu
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  // Event handler to close the user menu
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Event handler to toggle mobile drawer open/close state
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Event handler to toggle color mode
  const handleToggleColorMode = () => colorMode.toggleColorMode();

  const drawer = (
    // A sidebar with scrollable content
    <ScrollBar>
      {/* Toolbar with application logo */}
      <Toolbar>
        <Box
          component="img"
          src={Logo}
          alt="MediSearch Logo"
          sx={{
            width: 35,
            height: 35,
            objectFit: "cover",
          }}
        />
      </Toolbar>

      {/* User information panel */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          padding: 2,
          margin: 2,
        }}
      >
        {/* User avatar */}
        <Avatar
          alt="Foto del usuario"
          src={`${ASSETS}${auth.payload.UrlImage}`}
          sx={{
            marginRight: 1,
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
          }}
        />
        {/* User name */}
        <Typography sx={{ fontWeight: "bold" }}>{auth.payload.sub}</Typography>
      </Paper>

      {/* Navigation list */}
      <List>
        {/* Mapping through navigation items */}
        {nav.map(({ item, icon, to }) => {
          // Conditionally exclude "Farmacias" item for "Farmacia" role
          if (auth.payload.RoleType === "Farmacia" && item === "Farmacias") {
            return null;
          }

          // Conditionally exclude "Laboratorios" and "Provisiones" items for "Laboratorio" role
          if (
            auth.payload.RoleType === "Laboratorio" &&
            (item === "Laboratorios" || item === "Provisiones")
          ) {
            return null;
          }

          // Conditionally exclude "Crear Usuario" and "Mi empresa" items for non-"SuperAdmin" roles
          if (
            auth.payload.roles !== "SuperAdmin" &&
            (item === "Crear Usuario" || item === "Mi empresa")
          ) {
            return null;
          }

          // Render a navigation list item
          return (
            <ListItem key={item} disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ScrollBar>
  );

  // Check if the window object is defined, then set the 'container' accordingly
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor:
            colorMode.mode === "light"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(18, 18, 18, 0.2)",
          backdropFilter: "blur(8px)",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon
              style={{
                color: colorMode.mode === "light" ? "#637381" : undefined,
              }}
            />
          </IconButton>

          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            {/* Color Mode Toggle */}
            <IconButton onClick={handleToggleColorMode} color="inherit">
              {colorMode.mode === "light" ? (
                <Brightness4Icon style={{ color: "#637381" }} />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>

            {/* User Menu */}
            <>
              <Tooltip title="Abrir opciones">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Avatar
                    alt="Foto del usuario"
                    src={`${ASSETS}${auth.payload.UrlImage}`}
                  />
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
                {/* User Information */}
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
                <Divider sx={{ borderStyle: "dashed" }} />

                {/* User Settings */}
                {settings.map(({ option, route, Icon }) => (
                  <MenuItem
                    key={option}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={route}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemIcon>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
                <Divider />

                {/* Logout Option */}
                <MenuItem onClick={logoutUser}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Cerrar sesión</Typography>
                </MenuItem>
              </Menu>
            </>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box sx={{ marginTop: "94px", flexGrow: 1 }}>{main}</Box>
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  main: PropTypes.any,
  nav: PropTypes.array.isRequired,
  settings: PropTypes.array.isRequired,
};

export default ResponsiveDrawer;
