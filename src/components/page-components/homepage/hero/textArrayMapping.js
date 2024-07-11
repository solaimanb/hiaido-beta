function getTextArrayData(data) {
  return Object.entries(data).flatMap(([mainCategory, subCategories]) =>
    Object.entries(subCategories).map(([subCategory, values]) => ({
      mainCategory,
      subCategory,
      values,
    }))
  );
}

const filterByCategory = (category, textArrayData) => {
  const lowerCaseCategory = category.toLowerCase();
  return textArrayData.filter(
    (item) => item.mainCategory.toLowerCase() === lowerCaseCategory
  );
};

function filterSubCategoryTexts(subCategories, actionBtnText) {
  const lowerCaseAction = actionBtnText.toLowerCase();
  return subCategories.filter(
    (subCategory) => subCategory.subCategory.toLowerCase() === lowerCaseAction
  );
}

function getAllTextLines(data) {
  return Object.values(data).flatMap((subCategories) =>
    Object.values(subCategories).flat()
  );
}

export {
  getTextArrayData,
  getAllTextLines,
  filterByCategory,
  filterSubCategoryTexts
};
