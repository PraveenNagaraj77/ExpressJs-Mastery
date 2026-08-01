const express = require("express");
const app = express();

const movieList = [
  { id: 1, movieName: "Thulladha Manamum Thullum" },
  { id: 2, movieName: "Sachien" },
  { id: 3, movieName: "Ghilli" },
];

// GET - All Movies
app.get("/movies", (req, res) => {
  res.json(movieList);
});

// POST - Create a New Movie
app.post("/movies", (req, res) => {
  res.json({
    message: "New Movie Uploaded Successfully",
  });
});

// GET - Movie by ID
app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  const movie = movieList.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({
      message: "Movie Not Found",
    });
  }

  res.json(movie);
});

// PUT - Update Entire Movie
app.put("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  res.json({
    message: `Movie with ID ${id} updated successfully`,
  });
});

// PATCH - Partially Update Movie
app.patch("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  res.json({
    message: `Movie with ID ${id} partially updated successfully`,
  });
});

// DELETE - Delete Movie
app.delete("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  res.json({
    message: `Movie with ID ${id} deleted successfully`,
  });
});

app.listen(3000, () => {
  console.log("Server is Running on http://localhost:3000");
});