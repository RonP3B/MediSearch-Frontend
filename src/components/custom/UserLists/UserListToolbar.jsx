// Imports
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

// Define a styled component for the root toolbar
const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

// Define a styled component for the search input
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },
  "& fieldset": {
    borderWidth: `1px !important`,
  },
}));

// Functional component for the user list toolbar
const UserListToolbar = ({ filterName, onFilterName }) => {
  return (
    <StyledRoot>
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Buscar usuario..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
    </StyledRoot>
  );
};

// Define PropTypes to specify expected props and their types
UserListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default UserListToolbar;
