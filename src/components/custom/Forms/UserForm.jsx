// Imports
import { useState } from "react";
import useUserSignupFormik from "../../../hooks/formiks/useUserSignupFormik";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import InputField from "../InputFields/InputField";
import SubmitButton from "../Buttons/SubmitButton";
import ImageInput from "../InputFields/ImageInput";
import PasswordInputField from "../InputFields/PasswordInputField";
import SelectInputField from "../InputFields/SelectInputField";
import { telMask } from "../../../utils/masks";
import MaskedInputField from "../InputFields/MaskedInputField";
import useTerritorial from "../../../hooks/useTerritorial";

const UserForm = () => {
  // State variables to manage loading state, avatar image, and user image name
  const [loading, setLoading] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [userImgName, setUserImgName] = useState("");

  // Custom hook 'useUserSignupFormik' returns necessary values for Formik setup
  const { initialUserValues, validationUserSchema, onSubmitUser } =
    useUserSignupFormik(setLoading);

  return (
    <Formik
      initialValues={initialUserValues}
      onSubmit={onSubmitUser}
      validationSchema={validationUserSchema}
    >
      {() => (
        <Form>
          {/* Custom component for uploading user images */}
          <ImageInput
            name="image"
            label="Imagen del usuario"
            fileName={userImgName}
            setFileName={setUserImgName}
            avatarImage={avatarImage}
            setAvatarImage={setAvatarImage}
          />
          {/* Custom component containing other user form fields */}
          <UserFormContent />
          {/* Submit button with loading state and customization */}
          <SubmitButton
            loading={loading}
            text="Registrar"
            loadingText="Registrando..."
            variant="contained"
            fullWidth
          />
        </Form>
      )}
    </Formik>
  );
};

export const UserFormContent = () => {
  // Use the custom hook to get territorial data and related functions
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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <InputField name="firstName" label="Nombre" margin="dense" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField name="lastName" label="Apellido" margin="dense" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          name="userName"
          label="Nombre de usuario"
          margin="dense"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectInputField
          name="province"
          label="Provincia"
          margin="dense"
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
          fullWidth
          options={
            municipalities.length === 0
              ? [""]
              : ["", ...municipalities.map((municipality) => municipality.name)]
          }
          disabled={municipalities.length === 0}
          loading={loadingMunicipalities}
          ref={municipalitiesSelect}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField name="address" label="Dirección" margin="dense" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MaskedInputField
          mask={telMask}
          name="phoneNumber"
          type="tel"
          label="Teléfono"
          margin="dense"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PasswordInputField
          name="password"
          label="Contraseña"
          margin="dense"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PasswordInputField
          name="confirmPass"
          label="Confirmar contraseña"
          margin="dense"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          name="email"
          type="email"
          label="Correo electrónico"
          margin="dense"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default UserForm;
