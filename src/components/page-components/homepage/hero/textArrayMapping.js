function getTextArrayData(data) {
  let subCategories = [];
  for (let category in data) {
      for (let subCategory in data[category]) {
          subCategories.push({
              mainCategory: category,
              subCategory: subCategory,
              values: data[category][subCategory]
          });
      }
  }
  return subCategories;
}

const filterByCategory = (category, textArrayData) => {
  return textArrayData.filter(item => item.mainCategory.toLowerCase() === category.toLowerCase());
};

function filterSubCategoryTexts(subCategories, actionBtnText) {
  return subCategories.filter(
    (subCategory) => subCategory.subCategory.toLowerCase() === actionBtnText.toLowerCase()
  );
}

function getAllTextLines(data) {
  let textLines = [];
  for (let category in data) {
      for (let subCategory in data[category]) {
          textLines.push(...data[category][subCategory]);
      }
  }
  return textLines;
}

export {
  getTextArrayData,
  getAllTextLines,
  filterByCategory,
  filterSubCategoryTexts
};
