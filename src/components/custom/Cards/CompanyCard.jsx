// Imports
import PropTypes from "prop-types";
import CustomCard from "./CustomCard";

// Get the ASSETS URL from environment variables for images
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const CompanyCard = ({ company, to, favorite, favoritesManager }) => {
  // Destructure relevant properties from the 'company' object
  const { id, name, municipality, province, address, urlImage } = company;

  // Create the complete image URL using the ASSETS URL and 'urlImage'
  const companyImg = `${ASSETS}${urlImage}`;

  // Prepare an array of objects containing label and value for card information
  const cardInfo = [
    { label: "Provincia", val: province },
    { label: "Municipio", val: municipality },
    { label: "Dirección", val: address },
  ];

  // Return CustomCard component with provided props
  return (
    <CustomCard
      id={id}
      name={name}
      image={companyImg}
      to={to}
      maintenance={false}
      cardInfo={cardInfo}
      favorite={favorite}
      favoritesManager={favoritesManager}
    />
  );
};

// Define PropTypes to specify expected props and their types
CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  favorite: PropTypes.any.isRequired,
  favoritesManager: PropTypes.object,
};

export default CompanyCard;
