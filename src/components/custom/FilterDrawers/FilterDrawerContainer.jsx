// Imports
import PropTypes from "prop-types";
import ScrollBar from "../Scrollbar/ScrollBar";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const FilterDrawerContainer = ({
  children,
  openFilter,
  onCloseFilter,
  onClear,
}) => {
  return (
    <Drawer
      anchor="right"
      open={openFilter}
      onClose={onCloseFilter}
      PaperProps={{
        sx: { width: 280, border: "none" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 1, py: 2 }}
          >
            <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 500 }}>
              Filtros
            </Typography>
            <IconButton onClick={onCloseFilter}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
        </Box>
        <ScrollBar>{children}</ScrollBar>
        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="outlined"
            startIcon={<ClearAllIcon />}
            onClick={onClear}
          >
            Limpiar filtros
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

// Define PropTypes to specify expected props and their types
FilterDrawerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  openFilter: PropTypes.bool.isRequired,
  onCloseFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default FilterDrawerContainer;
