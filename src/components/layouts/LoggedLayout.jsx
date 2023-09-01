// Imports
import ResponsiveHeader from "../scenes/ResponsiveHeader";
import ResponsiveDrawer from "../scenes/ResponsiveDrawer";
import useAuth from "../../hooks/persistence/useAuth";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import { adminNav } from "../../utils/adminNav";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import Favorite from "@mui/icons-material/Favorite";

const LoggedLayout = () => {
  // Get the authentication data using the useAuth() hook
  const { auth } = useAuth();

  // Extracts the role from the authentication payload
  const role = auth.payload.roles;

  // Defines an array of pages accessible to both client and company admin roles
  const pages = [
    { page: "Inicio", route: "/client/home" },
    { page: "Productos", route: "/client/products" },
    { page: "Farmacias", route: "/client/companies/pharmacies" },
    { page: "Mis favoritos", route: "/client/favs" },
    { page: "Chat", route: "/client/chat" },
    { page: "Mi perfil", route: "/client/my-profile" },
  ];

  // Defines navigation options for clients
  const clientOptions = [
    { option: "Inicio", route: "/client/home", Icon: HomeIcon },
    { option: "Mi perfil", route: "/client/my-profile", Icon: PersonIcon },
    { option: "Mis favoritos", route: "/client/favs", Icon: Favorite },
  ];

  // Defines navigation options for clients
  const companyAdminOptions = [
    { option: "Dashboard", route: "/company/dashboard", Icon: DashboardIcon },
    { option: "Mi perfil", route: "/company/my-profile", Icon: PersonIcon },
  ];

  // If the user is a SuperAdmin, add an option for managing their company
  if (role === "SuperAdmin") {
    companyAdminOptions.push({
      option: "Mi empresa",
      route: "/company/my-company",
      Icon: HomeWorkIcon,
    });
  }

  // If the user is a Client, render the layout for clients
  if (role === "Client") {
    return (
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <ResponsiveHeader
          pages={pages}
          settings={clientOptions}
          logged={true}
        />
        <main>
          <Outlet />
        </main>
        <ToastContainer />
      </ConfirmProvider>
    );
  }

  // If the user is not a Client, render the layout for company admin
  return (
    <ConfirmProvider
      defaultOptions={{
        confirmationButtonProps: { autoFocus: true },
      }}
    >
      <ResponsiveDrawer
        main={
          <main>
            <Outlet />
          </main>
        }
        nav={adminNav}
        settings={companyAdminOptions}
      />
      <ToastContainer />
    </ConfirmProvider>
  );
};

export default LoggedLayout;
