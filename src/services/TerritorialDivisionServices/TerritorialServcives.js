import TerritorialDivisionApi from "../../APIs/TerritorialDivisionApi";

export const getProvinces = () => {
  return TerritorialDivisionApi.get("/provinces");
};

export const getProvinceMunicipalities = (provinceCode) => {
  return TerritorialDivisionApi.get(
    `/municipalities?provinceCode=${provinceCode}`
  );
};
