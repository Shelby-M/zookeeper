const express = require("express");
const app = express();
const { animals } = require("./data/animals.json");
const PORT = process.env.PORT || 3001;

function filterByQuery(query, animalsArray) {
  let filteredResults = animalsArray;
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}
function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`API server now on port {PORT}`);
});
