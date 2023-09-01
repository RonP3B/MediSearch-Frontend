// Imports
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ResponsiveHeader from "../scenes/ResponsiveHeader";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const UnloggedLayout = () => {
  // Array of page objects, each containing page name and route
  const pages = [
    { page: "Inicio", route: "/" },
    { page: "Farmacias", route: "/companies/pharmacies" },
    { page: "Laboratorios", route: "/companies/labs" },
    { page: "Productos", route: "/products" },
  ];

  // Array of options for unlogged users, each containing option name, route, and icon
  const options = [
    { option: "Iniciar sesión", route: "/login", Icon: LoginIcon },
    { option: "Registrarse", route: "/signup", Icon: AppRegistrationIcon },
  ];

  return (
    <>
      <ResponsiveHeader pages={pages} settings={options} logged={false} />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default UnloggedLayout;
