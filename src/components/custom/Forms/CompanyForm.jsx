// Imports
import { useState } from "react";
import MultiStepForm, { FormStep } from "../MultiForm/MultiStepForm";
import InputField from "../InputFields/InputField";
import Grid from "@mui/material/Grid";
import useUserSignupFormik from "../../../hooks/formiks/useUserSignupFormik";
import useCompanyFormik from "../../../hooks/formiks/useCompanyFormik";
import { UserFormContent } from "./UserForm";
import ImageInput from "../InputFields/ImageInput";
import SelectInputField from "../InputFields/SelectInputField";
import MaskedInputField from "../InputFields/MaskedInputField";
import { telMask } from "../../../utils/masks";
import useTerritorial from "../../../hooks/useTerritorial";

const CompanyForm = () => {
  // States
  const [loading, setLoading] = useState(false);
  const [companyImage, setCompanyImage] = useState(null);
  const [companyImgName, setCompanyImgName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [userImgName, setUserImgName] = useState("");

  // Destructures values from useUserSignupFormik custom hook
  const { validationUserSchema, initialUserValues } = useUserSignupFormik();

  // Destructures values from useCompanyFormik custom hook and pass setLoading function as parameter
  const {
    validationCompanySchema,
    validationCompanySocialsSchema,
    initialCompanyValues,
    onSubmit,
  } = useCompanyFormik(setLoading);

  // Destructures values from useTerritorial custom hook for location-related data
  const {
    provinces,
    municipalities,
    setSelectedProvince,
    municipalitiesSelect,
    provincesSelect,
    loadingMunicipalities,
    loadingProvinces,
  } = useTerritorial();

  return (
    <MultiStepForm
      initialValues={{ ...initialUserValues, ...initialCompanyValues }}
      onSubmit={onSubmit}
      loading={loading}
    >
      <FormStep
        stepName="Información del administrador"
        validationSchema={validationUserSchema}
      >
        <ImageInput
          name="image"
          label="Imagen del usuario"
          fileName={userImgName}
          setFileName={setUserImgName}
          avatarImage={userImage}
          setAvatarImage={setUserImage}
        />
        <UserFormContent />
      </FormStep>
      <FormStep
        stepName="Información de la empresa"
        validationSchema={validationCompanySchema}
      >
        <ImageInput
          name="imageLogo"
          label="Logo de la empresa"
          fileName={companyImgName}
          setFileName={setCompanyImgName}
          avatarImage={companyImage}
          setAvatarImage={setCompanyImage}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputField
              name="ceo"
              label="Nombre del CEO"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name="nameCompany"
              label="Nombre de la empresa"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInputField
              name="provinceCompany"
              label="Provincia de la empresa"
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
              name="municipalityCompany"
              label="Municipio de la empresa"
              margin="dense"
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
              name="addressCompany"
              label="Dirección de la empresa"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name="emailCompany"
              label="Correo electrónico de la empresa"
              type="email"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MaskedInputField
              mask={telMask}
              name="phoneCompany"
              label="Teléfono de la empresa"
              type="tel"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInputField
              name="companyType"
              label="Tipo de empresa"
              margin="dense"
              fullWidth
              options={["", "Farmacia", "Laboratorio"]}
            />
          </Grid>
        </Grid>
      </FormStep>
      <FormStep
        stepName="Redes de la empresa (opcional)"
        validationSchema={validationCompanySocialsSchema}
      >
        <InputField
          name="webSite"
          label="Sitio web URL"
          margin="dense"
          fullWidth
        />
        <InputField
          name="facebook"
          label="Facebook URL"
          margin="dense"
          fullWidth
        />
        <InputField
          name="instagram"
          label="Instagram URL"
          margin="dense"
          fullWidth
        />
        <InputField
          name="twitter"
          label="Twitter URL"
          margin="dense"
          fullWidth
        />
      </FormStep>
    </MultiStepForm>
  );
};

export default CompanyForm;
