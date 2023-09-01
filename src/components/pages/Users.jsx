// Imports
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import { getComparator, applySortFilter } from "../../utils/tableHelpers";
import useToast from "../../hooks/feedback/useToast";
import useAuth from "../../hooks/persistence/useAuth";
import UserListHead from "../custom/UserLists/UserListHead";
import UserListToolbar from "../custom/UserLists/UserListToolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../services/MediSearchServices/AdminServices";

// Define the ASSETS constant to hold a reference to the VITE_MEDISEARCH environment variable
const ASSETS = import.meta.env.VITE_MEDISEARCH;

// Define TABLE_HEAD, an array describing the columns of the table to be displayed
const TABLE_HEAD = [
  { id: "name", label: "Nombre", alignRight: false },
  { id: "email", label: "Correo", alignRight: false },
  { id: "phone", label: "Teléfono", alignRight: false },
  { id: "role", label: "Rol", alignRight: false },
  { id: "province", label: "Provincia", alignRight: false },
  { id: "municipality", label: "Municipio", alignRight: false },
  { id: "address", label: "Dirección", alignRight: false },
  { id: "" },
];

// Define the Users component
const Users = () => {
  // State variables to manage various aspects of the component
  const [users, setUsers] = useState([]); // Holds user data
  const [userID, setUserID] = useState(""); // Holds the ID of the selected user
  const [loading, setLoading] = useState(true); // Indicates whether data is loading
  const [open, setOpen] = useState(null); // Holds anchor element for menu
  const [page, setPage] = useState(0); // Holds the current page number
  const [order, setOrder] = useState("asc"); // Holds the sorting order ("asc" or "desc")
  const [orderBy, setOrderBy] = useState("name"); // Holds the property to be sorted by
  const [filterName, setFilterName] = useState(""); // Holds the filter value for user names
  const [rowsPerPage, setRowsPerPage] = useState(5); // Holds the number of rows per page

  // Toast functionality
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // custom hooks
  const { auth } = useAuth();
  const confirm = useConfirm();

  // Fetch employees data from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployees();
        setUsers(res.data);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;

        showToastRef.current(
          "Ocurrió un error al obtener los usuarios, informelo al equipo técnico",
          {
            type: "error",
          }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Function to delete a user
  const deleteUser = async () => {
    setOpen(null); // Close the menu

    // Check user's role before proceeding with deletion
    if (auth.payload.roles !== "SuperAdmin") {
      return showToast("No tienes permiso para realizar esta acción", {
        type: "warning",
      });
    }

    try {
      // Show confirmation dialog before deleting
      await confirm({
        title: "Confirmación",
        description: "¿Estás seguro que deseas eliminar a este usuario?",
        cancellationText: "Cancelar",
      });

      // Delete user from the server
      await deleteEmployee(userID);

      // Remove the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userID));

      // Feedback
      showToast("Usuario eliminado con éxito", { type: "success" });
    } catch (error) {
      if (error?.response)
        showToast(
          "Ocurrió un error al intentar eliminar un usuario, informelo al equipo técnico",
          { type: "error" }
        );
    }
  };

  // Functions to handle UI interactions and state changes
  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setUserID(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Calculate the number of empty rows for pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  // Apply sorting and filtering to the user list
  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  // Check if no users are found after applying filters
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <Container sx={{ maxWidth: "90vw", mb: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Usuarios
        </Typography>
        {/* Display "Nuevo Usuario" button for SuperAdmin */}
        {auth.payload.roles === "SuperAdmin" && (
          <Button
            component={Link}
            to="add"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Nuevo Usuario
          </Button>
        )}
      </Stack>
      <Card sx={{ boxShadow: 3, mb: 3, borderRadius: "12px" }}>
        <UserListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <TableContainer>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* Show loading indicator during loading */}
              {loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: "center",
                        padding: 2,
                      }}
                    >
                      <CircularProgress />
                    </Paper>
                  </TableCell>
                </TableRow>
              ) : (
                // Display user rows
                filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    // Destructure user data
                    const {
                      id,
                      firstName,
                      lastName,
                      role,
                      address,
                      email,
                      municipality,
                      province,
                      phoneNumber,
                      urlImage,
                    } = row;

                    // Skip rendering the current user's data
                    if (id === auth.payload.uid) return null;

                    // Render user row
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        {/* User data cells */}
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar
                              alt={firstName}
                              src={`${ASSETS}${urlImage}`}
                              sx={{ marginLeft: 1 }}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {firstName} {lastName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{phoneNumber}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">{province}</TableCell>
                        <TableCell align="left">{municipality}</TableCell>
                        <TableCell align="left">{address}</TableCell>

                        {/* Action cell with "More" button */}
                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(event) => handleOpenMenu(event, id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}

              {/* Show empty rows if necessary */}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>

            {/* Display "Usuario no encontrado" message */}
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: "center",
                        padding: 2,
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Usuario no encontrado
                      </Typography>
                      <Typography variant="body2">
                        No hay resultados para: &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            {/* Display "No hay ningún usuario registrado" message */}
            {users.length === 1 &&
              users[0].id === auth.payload.uid &&
              !isNotFound &&
              !loading && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                          padding: 2,
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          No hay ningún usuario registrado
                        </Typography>

                        <Button
                          component={Link}
                          to="add"
                          variant="contained"
                          startIcon={<AddIcon />}
                        >
                          Nuevo Usuario
                        </Button>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Popover for user menu */}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: "error.main" }} onClick={deleteUser}>
          <DeleteIcon sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Container>
  );
};

export default Users;
