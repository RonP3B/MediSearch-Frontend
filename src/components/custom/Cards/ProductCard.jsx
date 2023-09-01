// Imports
import PropTypes from "prop-types";
import CustomCard from "./CustomCard";

// Gets the ASSETS URL from environment variables for images
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ProductCard = (props) => {
  // Destructures  properties from the 'props' object
  const {
    product,
    maintenance,
    showCompanyInfo,
    companyType,
    handleDelete,
    to,
    favorite,
    favoritesManager,
  } = props;

  // Destructures specific properties from the 'product' object
  const { name, price, quantity, id, urlImages, nameCompany, province } =
    product;

  // Gets the URL for the first image of the product
  const firstImageUrl = `${ASSETS}${urlImages[0]}`;

  // Prepares an array of objects containing label and value for card information
  const cardInfo = [
    { label: "Precio", val: `$${price}` },
    { label: "Cantidad disponible", val: quantity },
  ];

  // If 'showCompanyInfo' is true, add company-related information to cardInfo
  if (showCompanyInfo) {
    cardInfo.push({ label: companyType, val: nameCompany });
    cardInfo.push({ label: "Provincia", val: province });
  }

  return (
    <CustomCard
      id={id}
      name={name}
      image={firstImageUrl}
      to={to}
      maintenance={maintenance}
      handleDelete={handleDelete}
      cardInfo={cardInfo}
      favorite={favorite}
      favoritesManager={favoritesManager}
    />
  );
};

// Define PropTypes to specify expected props and their types
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  maintenance: PropTypes.bool.isRequired,
  showCompanyInfo: PropTypes.bool.isRequired,
  companyType: PropTypes.string,
  to: PropTypes.string.isRequired,
  favorite: PropTypes.any.isRequired,
  favoritesManager: PropTypes.object,
};

export default ProductCard;
