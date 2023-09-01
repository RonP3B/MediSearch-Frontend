// Imports
import FilterDrawerContainer from "./FilterDrawerContainer";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CompanyFilterContent from "./CompanyFilterContent";

const CompanyFilterDrawer = (props) => {
  // Destructures the necessary props: openFilter, onCloseFilter, onClear, and filters
  const { openFilter, onCloseFilter, onClear, filters } = props;

  return (
    <FilterDrawerContainer
      openFilter={openFilter}
      onCloseFilter={onCloseFilter}
      onClear={onClear}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        <Stack spacing={3}>
          <CompanyFilterContent filters={filters} />
        </Stack>
      </Box>
    </FilterDrawerContainer>
  );
};

// Define PropTypes to specify expected props and their types
CompanyFilterDrawer.propTypes = {
  openFilter: PropTypes.bool.isRequired,
  onCloseFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default CompanyFilterDrawer;
