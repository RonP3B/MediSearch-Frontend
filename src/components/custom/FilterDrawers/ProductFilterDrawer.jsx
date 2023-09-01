// Imports
import CompanyFilterContent from "./CompanyFilterContent";
import FilterDrawerContainer from "./FilterDrawerContainer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import FilterOptionsFormGroup from "./FilterOptionsFormGroup";
import ScrollBar from "../Scrollbar/ScrollBar";
import handleSelectedCheckboxes from "../../../utils/handleSelectedCheckboxes";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const ProductFilterDrawer = (props) => {
  // Destructuring props
  const { openFilter, onCloseFilter, onClear, filters, companyFilters } = props;

  return (
    <FilterDrawerContainer
      openFilter={openFilter}
      onCloseFilter={onCloseFilter}
      onClear={onClear}
    >
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", p: 3 }}>
        <Stack spacing={3}>
          {/* Section for Clasificaciones */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Clasificaciones:
            </Typography>
            <FilterOptionsFormGroup>
              <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
                <RadioGroup
                  onChange={(e) => {
                    filters.classifications.selectedSetter(e.target.value);
                    filters.categories.selectedSetter([]);
                  }}
                  value={filters.classifications.selected}
                >
                  {filters.classifications.values.map((name, index) => (
                    <FormControlLabel
                      key={index}
                      sx={{ margin: 0 }}
                      control={<Radio />}
                      label={name}
                      value={name}
                    />
                  ))}
                </RadioGroup>
              </ScrollBar>
            </FilterOptionsFormGroup>
          </Box>

          {/* Section for Categorías */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Categorías:
            </Typography>
            <FilterOptionsFormGroup>
              {/* Conditional rendering based on selected categories */}
              {filters.categories.values.length === 0 ? (
                // Message displayed when there are not any classifications selected
                <Box
                  sx={{
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ReportProblemIcon sx={{ fontSize: 50 }} color="primary" />
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    Selecciona 1 clasificación
                  </Typography>
                </Box>
              ) : (
                // Scrollable checkboxes for selecting categories
                <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
                  {filters.categories.values.map((name, index) => (
                    <FormControlLabel
                      key={index}
                      sx={{ margin: 0 }}
                      control={
                        <Checkbox
                          checked={filters.categories.selected.includes(name)}
                          onChange={() =>
                            handleSelectedCheckboxes(
                              filters.categories.selected,
                              filters.categories.selectedSetter,
                              name
                            )
                          }
                        />
                      }
                      label={name}
                    />
                  ))}
                </ScrollBar>
              )}
            </FilterOptionsFormGroup>
          </Box>

          {/* Conditional rendering of CompanyFilterContent component */}
          {companyFilters && <CompanyFilterContent filters={filters} />}

          {/* Section for Nombre del producto */}
          <Box>
            <TextField
              label="Nombre del producto"
              variant="standard"
              value={filters.product.value}
              onChange={(e) => filters.product.setter(e.target.value)}
              fullWidth
            />
          </Box>

          {/* Section for Rango de precio */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Rango de precio:
            </Typography>
            <Slider
              value={filters.price.value}
              onChange={(event, newValue) => {
                filters.price.setter(newValue);
              }}
              valueLabelDisplay="auto"
              max={filters.price.maxPrice}
              min={1}
            />
          </Box>

          {/* Section for Con cantidades a partir de */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Con cantidades a partir de:
            </Typography>
            <Slider
              value={filters.quantity.value}
              onChange={(event, newValue) => {
                filters.quantity.setter(newValue);
              }}
              valueLabelDisplay="auto"
              min={0}
            />
          </Box>
        </Stack>
      </Box>
    </FilterDrawerContainer>
  );
};

// Define PropTypes to specify expected props and their types
ProductFilterDrawer.propTypes = {
  openFilter: PropTypes.bool.isRequired,
  onCloseFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  companyFilters: PropTypes.bool.isRequired,
};

export default ProductFilterDrawer;
