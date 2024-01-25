const citiesList = require('cities-list');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
function transformCitiesList(originalList) {
  if (!originalList || typeof originalList !== 'object') {
    return null;
  }

  const transformedList = Object.entries(originalList).map(([cityName, value]) => ({
    id: uuidv4(),
    title: cityName,
  }));

  return transformedList;
}

function saveToFile(data, filename) {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const transformedCitiesList = transformCitiesList(citiesList);

saveToFile(transformedCitiesList, 'transformedCitiesList.json');
