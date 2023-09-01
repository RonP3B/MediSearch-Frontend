const handleSelectedCheckboxes = (selectedArr, setSelected, name) => {
  if (selectedArr.includes(name)) {
    setSelected((prevSelected) =>
      prevSelected.filter((selectedName) => selectedName !== name)
    );
  } else {
    setSelected((prevSelected) => [...prevSelected, name]);
  }
};

export default handleSelectedCheckboxes;
