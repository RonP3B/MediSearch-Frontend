// Imports
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import TuneIcon from "@mui/icons-material/Tune";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import CompanyCard from "../custom/Cards/CompanyCard";
import CompanyFilterDrawer from "../custom/FilterDrawers/CompanyFilterDrawer";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import useFilters from "../../hooks/filters/useFilters";
import {
  getAllLabs,
  getAllPharmacies,
} from "../../services/MediSearchServices/HomeServices";

const Companies = ({
  companyType,
  logged,
  isCompany,
  hideTitle,
  initialValues,
}) => {
  // State variables
  const [openFilter, setOpenFilter] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reference to the toast notification function
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Custom hook for handling filters
  const {
    filters,
    clearFilters,
    filteredData: filteredCompanies,
  } = useFilters(companies, false);

  // Fetch companies data from API or use initial values
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Fetch data based on company type
        const res = await (companyType === "farmacia"
          ? getAllPharmacies()
          : getAllLabs());

        // Update the companies state with fetched data
        setCompanies(res.data);
      } catch (error) {
        // Ignored errors
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;

        // Show error toast
        showToastRef.current(
          "Ocurrió un error al obtener las empresas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (initialValues) {
      setCompanies(initialValues.values); // Use initial values if provided
      setLoading(false);
    } else {
      fetchCompanies(); // Fetch companies if no initial values
    }
  }, [companyType, initialValues]);

  // Handlers for opening and closing the filter modal
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      <CompanyFilterDrawer
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
        filters={filters}
        onClear={clearFilters}
      />

      {/* Stack component for header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        {/* Title of the section */}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {!hideTitle &&
            `${companyType.charAt(0).toUpperCase() + companyType.slice(1)}s`}
        </Typography>

        {/* Button for opening the filters */}
        {!loading && companies.length > 0 && (
          <Button
            variant="contained"
            startIcon={<TuneIcon />}
            onClick={handleOpenFilter}
          >
            Filtros
          </Button>
        )}
      </Stack>

      {/* Loading state */}
      {loading && (
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

      {/* No companies found */}
      {!loading && companies.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "55vh",
          }}
        >
          <DomainDisabledIcon sx={{ fontSize: 200, color: "primary.main" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            No hay {companyType}s{" "}
            {initialValues ? "en tus favoritos" : "en la plataforma"}
          </Typography>
        </Box>
      )}

      {/* Display companies */}
      {companies.length > 0 &&
        (filteredCompanies.length > 0 ? (
          <Grid container spacing={2}>
            {filteredCompanies.map((company) => (
              <Grid item key={company.id} xs={12} sm={6} md={4}>
                <CompanyCard
                  favorite={
                    logged && {
                      isFavorite: company.isFavorite,
                      favoriteType: "company",
                    }
                  }
                  favoritesManager={initialValues}
                  company={company}
                  to={`${
                    isCompany
                      ? "/company"
                      : logged
                      ? "/client/companies"
                      : "/companies"
                  }/company-details/${company.id}`}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          // No companies matching filters
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "55vh",
            }}
          >
            <FilterListOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No hay {companyType}s que cumplan con los filtros
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
Companies.propTypes = {
  companyType: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
  isCompany: PropTypes.bool.isRequired,
  hideTitle: PropTypes.bool,
  initialValues: PropTypes.object,
};

export default Companies;
