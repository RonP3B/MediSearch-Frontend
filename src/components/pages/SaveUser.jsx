// Imports
import { useState } from "react";
import { Formik, Form } from "formik";
import { telMask } from "../../utils/masks";
import useEmployeeRegisterFormik from "../../hooks/formiks/useEmployeeRegisterFormik";
import useTerritorial from "../../hooks/useTerritorial";
import MaskedInputField from "../custom/InputFields/MaskedInputField";
import SubmitButton from "../custom/Buttons/SubmitButton";
import InputField from "../custom/InputFields/InputField";
import SelectInputField from "../custom/InputFields/SelectInputField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const SaveUser = () => {
  // Define a state for loading state management
  const [loading, setLoading] = useState(false);

  // Retrieve formik-related data from a custom hook
  const { initialValues, validationSchema, onSubmit } =
    useEmployeeRegisterFormik(setLoading);

  // Retrieve territorial data and related functions from another custom hook
  const {
    provinces,
    municipalities,
    setSelectedProvince,
    municipalitiesSelect,
    provincesSelect,
    loadingProvinces,
    loadingMunicipalities,
  } = useTerritorial();

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
        Registrar usuario
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  name="firstName"
                  label="Nombre"
                  margin="dense"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name="lastName"
                  label="Apellido"
                  margin="dense"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MaskedInputField
                  mask={telMask}
                  name="phoneNumber"
                  type="tel"
                  label="Teléfono"
                  margin="dense"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  margin="dense"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInputField
                  name="province"
                  label="Provincia"
                  margin="dense"
                  variant="filled"
                  fullWidth
                  options={
                    provinces.length === 0
                      ? [""]
                      : ["", ...provinces.map((province) => province.name)]
                  }
                  setSelected={setSelectedProvince}
                  disabled={provinces.length === 0}
                  loading={loadingProvinces}
                  ref={provincesSelect}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInputField
                  name="municipality"
                  label="Municipio"
                  margin="dense"
                  variant="filled"
                  fullWidth
                  options={
                    municipalities.length === 0
                      ? [""]
                      : [
                          "",
                          ...municipalities.map(
                            (municipality) => municipality.name
                          ),
                        ]
                  }
                  disabled={municipalities.length === 0}
                  loading={loadingMunicipalities}
                  ref={municipalitiesSelect}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name="address"
                  label="Dirección"
                  margin="dense"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInputField
                  name="role"
                  label="Rol"
                  margin="dense"
                  variant="filled"
                  fullWidth
                  options={["", "SuperAdmin", "Admin"]}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="end" mt="20px">
              <SubmitButton
                loading={loading}
                text="Registrar usuario"
                loadingText="Registrando usuario..."
                variant="contained"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SaveUser;
