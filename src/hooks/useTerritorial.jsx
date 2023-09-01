// Imports
import { useState, useEffect, useRef } from "react";
import {
  getProvinceMunicipalities,
  getProvinces,
} from "../services/TerritorialDivisionServices/TerritorialServcives";

const useTerritorial = () => {
  // State variables to hold provinces, municipalities, and loading statuses
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  // State variables for selected province and municipality reset
  const [selectedProvince, setSelectedProvince] = useState("");
  const [resetMunicipality, setResetMunicipality] = useState(true);

  // Refs to hold references to select elements
  const municipalitiesSelect = useRef();
  const provincesSelect = useRef();

  // Effect to fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        // Fetch provinces
        const response = await getProvinces();
        setProvinces(response.data.data);

        // Get the selected value from the provinces select element
        const provinceValue = provincesSelect.current?.getValue();

        // If there's a selected province value, set it and prevent municipality reset
        if (provinceValue) {
          setSelectedProvince(provinceValue);
          setResetMunicipality(false);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  // Effect to fetch municipalities when the selected province changes
  useEffect(() => {
    const fetchMunicipalities = async () => {
      // If no selected province, clear the municipalities array
      if (!selectedProvince) return setMunicipalities([]);

      try {
        setLoadingMunicipalities(true);

        // Get the province code for the selected province
        const provinceCode = provinces.filter(
          (province) => province.name === selectedProvince
        )[0]?.code;

        // Fetch municipalities for the selected province (getProvinceMunicipalities function assumed)
        const response = await getProvinceMunicipalities(provinceCode);
        let responseData = [];

        // Process the response data to an array format
        if (Array.isArray(response.data.data)) {
          responseData = response.data.data;
        } else if (typeof response.data.data === "object") {
          responseData = [response.data.data];
        }

        setMunicipalities(responseData);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      } finally {
        setLoadingMunicipalities(false);
      }
    };

    // If a province is selected and resetMunicipality flag is true, clear the municipality select
    if (selectedProvince !== "" && resetMunicipality) {
      municipalitiesSelect.current?.setValue("");
    }

    // Fetch municipalities only if there are provinces available
    provinces.length > 0 && fetchMunicipalities();

    // Reset the municipality reset flag after the effect
    return () => setResetMunicipality(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  return {
    provinces,
    municipalities,
    selectedProvince,
    setSelectedProvince,
    municipalitiesSelect,
    provincesSelect,
    setProvinces,
    loadingProvinces,
    loadingMunicipalities,
  };
};

export default useTerritorial;
