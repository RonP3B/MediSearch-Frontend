// Imports
import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Products from "./Products";

const HomeProducts = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Productos
      </Typography>
      <CustomTabs
        tabs={[
          {
            label: "de farmacias",
            // Displaying products with specific attributes for pharmacies
            content: (
              <Products
                isCompany={false}
                logged={false}
                companyType="Farmacia"
              />
            ),
          },
          {
            label: "de laboratorios",
            // Displaying products with specific attributes for laboratories
            content: (
              <Products
                isCompany={false}
                logged={false}
                companyType="Laboratorio"
              />
            ),
          },
        ]}
      />
    </Container>
  );
};

export default HomeProducts;
