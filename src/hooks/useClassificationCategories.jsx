// Import necessary modules
import { useState, useEffect, useRef } from "react";
import { classificationCategories } from "../utils/classificationCategories";

// Custom hook for managing classification categories
const useClassificationCategories = () => {
  // State for categories and selected classification
  const [categories, setCategories] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState("");

  // State to manage category reset
  const [resetCategories, setResetCategories] = useState(false);

  // Refs for DOM elements
  const categoriesSelect = useRef();
  const classificationsSelect = useRef();

  // Effect to handle changes in the selected classification
  useEffect(() => {
    // Reset categories if necessary
    resetCategories && categoriesSelect.current?.setValue([]);

    // Load categories for the selected classification
    if (selectedClassification) {
      setCategories(
        classificationCategories.find(
          (item) => item.classification === selectedClassification
        ).categories
      );

      // Set resetCategories to true after loading categories
      !resetCategories && setResetCategories(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClassification]);

  // Create an array of available classifications
  const classifications = classificationCategories.map(
    (item) => item.classification
  );

  // Return objects for external use
  return {
    classifications,
    categories,
    setSelectedClassification,
    categoriesSelect,
    classificationsSelect,
    selectedClassification,
  };
};

// Export the custom hook
export default useClassificationCategories;
