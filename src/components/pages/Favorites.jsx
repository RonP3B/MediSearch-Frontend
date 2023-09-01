// Imports
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Products from "./Products";
import Companies from "./Companies";
import useToast from "../../hooks/feedback/useToast";
import {
  getFavoriteCompanies,
  getFavoriteProducts,
} from "../../services/MediSearchServices/HomeServices";

const Favorites = ({ isPharmacy, isLab }) => {
  // State hooks to hold various data and loading indicators
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [loadingProducts, setLoadingPropducts] = useState(!isLab);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  // Access to the toast notification function
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Effect to fetch and set favorite products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch favorite products
        const res = await getFavoriteProducts();
        const productsArr = res.data;

        // Find the highest price among favorite products
        const highestPrice = productsArr.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        // Modify the array of products to include an 'id' property
        const modifiedArray = productsArr.map((item) => {
          const { productId, ...rest } = item;
          return {
            ...rest,
            id: productId,
          };
        });

        // Set the highest price and the modified product array
        setHighestPrice(highestPrice);
        setProducts(modifiedArray);
      } catch (error) {
        // Ignored error
        if (error.response?.data?.Error === "ERR_JWT") return;

        // Show toast
        showToastRef.current(
          "Ocurrió un error al obtener tus productos favoritos, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        // Regardless of success or failure, indicate that loading is complete
        setLoadingPropducts(false);
      }
    };

    // Fetch products if not in lab mode
    !isLab && fetchProducts();
  }, [isLab]);

  // Effect to fetch and set favorite companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Fetch favorite companies
        const res = await getFavoriteCompanies();

        // Modify the array of companies to include an 'id' property
        const modifiedArray = res.data.map((item) => {
          const { companyId, ...rest } = item;
          return {
            ...rest,
            id: companyId,
          };
        });

        // Set the modified company array
        setCompanies(modifiedArray);
      } catch (error) {
        // Ignored error
        if (error.response?.data?.Error === "ERR_JWT") return;

        // Show toast
        showToastRef.current(
          "Ocurrió un error al obtener tus farmacias favoritas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        // Regardless of success or failure, indicate that loading is complete
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Mis {isLab && "farmacias"} favorit{isLab ? "a" : "o"}s
      </Typography>
      {loadingProducts || loadingCompanies ? (
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
      ) : isLab ? (
        <Companies
          companyType="farmacia"
          logged={true}
          isCompany={true}
          hideTitle={true}
          initialValues={{ values: companies, setter: setCompanies }}
        />
      ) : (
        <CustomTabs
          tabs={[
            {
              label: isPharmacy ? "provisiones" : "productos",
              content: (
                <Products
                  isCompany={isPharmacy || isLab}
                  logged={true}
                  companyType={isPharmacy ? "Laboratorio" : "Farmacia"}
                  hideTitle={true}
                  initialValues={{ values: products, setter: setProducts }}
                  initialHighestPrice={highestPrice}
                />
              ),
            },
            {
              label: isPharmacy ? "laboratorios" : "farmacias",
              content: (
                <Companies
                  companyType={isPharmacy ? "laboratorio" : "farmacia"}
                  logged={true}
                  isCompany={isPharmacy || isLab}
                  hideTitle={true}
                  initialValues={{ values: companies, setter: setCompanies }}
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
Favorites.propTypes = {
  isPharmacy: PropTypes.bool.isRequired,
  isLab: PropTypes.bool.isRequired,
};

export default Favorites;
