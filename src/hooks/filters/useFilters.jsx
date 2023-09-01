// Imports
import { useState } from "react";
import useTerritorial from "../useTerritorial";
import useClassificationCategories from "../useClassificationCategories";

const useFilters = (data, productFilters) => {
  // State variables to manage filters
  const [productNameFilter, setProductNameFilter] = useState(""); // Filter for product name
  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]); // List of selected municipalities
  const [companyNameFilter, setCompanyNameFilter] = useState(""); // Filter for company name
  const [addressFilter, setAddressFilter] = useState(""); // Filter for address
  const [selectedCategories, setSelectedCategories] = useState([]); // List of selected categories
  const [quantityFilter, setQuantityFilter] = useState(0); // Filter for quantity
  const [priceFilter, setPriceFilter] = useState([]); // Filter for price range
  const [maxPrice, setMaxPrice] = useState(0); // Maximum price filter

  // Destructure properties from custom hooks for territorial and classification data
  const {
    provinces,
    municipalities,
    selectedProvince,
    setSelectedProvince,
    loadingMunicipalities,
  } = useTerritorial();

  const {
    classifications,
    categories,
    selectedClassification,
    setSelectedClassification,
  } = useClassificationCategories();

  // Determine the appropriate property name based on whether productFilters is truthy
  const companyProp = productFilters ? "nameCompany" : "name";

  // If data is not an array, extract the products array from the data object
  if (!Array.isArray(data)) data = data.products;

  // Object that holds various filters and their corresponding values and setters
  const filters = {
    // Filter by product name
    product: {
      value: productNameFilter,
      setter: setProductNameFilter,
    },
    // Filter by categories
    categories: {
      values: categories,
      selectedSetter: setSelectedCategories,
      selected: selectedCategories,
    },
    // Filter by price range
    price: {
      value: priceFilter,
      setter: setPriceFilter,
      maxPrice,
    },
    // Filter by quantity
    quantity: {
      value: quantityFilter,
      setter: setQuantityFilter,
    },
    // Filter by address
    address: {
      value: addressFilter,
      setter: setAddressFilter,
    },
    // Filter by company name
    company: {
      value: companyNameFilter,
      setter: setCompanyNameFilter,
    },
    // Filter by provinces
    provinces: {
      values: provinces,
      selected: selectedProvince,
      selectedSetter: setSelectedProvince,
    },
    // Filter by municipalities
    municipalities: {
      values: municipalities,
      selected: selectedMunicipalities,
      selectedSetter: setSelectedMunicipalities,
      loading: loadingMunicipalities,
    },
    // Filter by classifications
    classifications: {
      values: classifications,
      selected: selectedClassification,
      selectedSetter: setSelectedClassification,
    },
  };

  // Function to clear all the filters
  const clearFilters = () => {
    setProductNameFilter("");
    setSelectedCategories([]);
    setPriceFilter([1, maxPrice]);
    setQuantityFilter(0);
    setAddressFilter("");
    setCompanyNameFilter("");
    setSelectedProvince("");
    setSelectedMunicipalities([]);
    setSelectedClassification("");
  };

  // Filter the 'data' array based on various conditions
  const filteredData = data.filter((data) => {
    // Check if 'companyNameFilter' is provided and filter by company name
    if (
      companyNameFilter &&
      data[companyProp]
        .toLowerCase()
        .indexOf(companyNameFilter.toLowerCase()) === -1
    ) {
      return false;
    }

    // Check if 'addressFilter' is provided and filter by address
    if (
      addressFilter &&
      data.address.toLowerCase().indexOf(addressFilter.toLowerCase()) === -1
    ) {
      return false;
    }

    // Check if 'selectedProvince' is provided and filter by province
    if (selectedProvince && data.province !== selectedProvince) {
      return false;
    }

    // Check if 'selectedMunicipalities' array has values and filter by municipalities
    if (
      selectedMunicipalities.length > 0 &&
      !selectedMunicipalities.includes(data.municipality)
    ) {
      return false;
    }

    // If no 'productFilters', keep the data (no filtering needed)
    if (!productFilters) {
      return true;
    }

    // Check if 'productNameFilter' is provided and filter by product name
    if (
      productNameFilter &&
      data.name.toLowerCase().indexOf(productNameFilter.toLowerCase()) === -1
    ) {
      return false;
    }

    // Check if 'selectedCategories' array has values and filter by categories
    if (selectedCategories.length > 0) {
      const dataCategories = data.categories;

      // Check if data has at least one category that matches a selected category
      const hasMatchingCategory = selectedCategories.some((category) =>
        dataCategories.includes(category)
      );

      if (!hasMatchingCategory) return false;
    }

    // Extract 'minPrice' and 'maxPrice' from 'priceFilter'
    const [minPrice, maxPrice] = priceFilter;

    // Filter by price range
    if (data.price < minPrice || data.price > maxPrice) {
      return false;
    }

    // Check if 'quantityFilter' is greater than 0 and filter by quantity
    if (quantityFilter > 0 && data.quantity < quantityFilter) {
      return false;
    }

    // Check if 'selectedClassification' is provided and filter by classification
    if (
      selectedClassification &&
      data.classification !== selectedClassification
    ) {
      return false;
    }

    // If none of the above conditions match, keep the data
    return true;
  });

  return {
    filters,
    clearFilters,
    filteredData,
    setMaxPrice,
    setPriceFilter,
  };
};

export default useFilters;
