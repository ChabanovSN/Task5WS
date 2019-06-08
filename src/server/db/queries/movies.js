const knex = require('../connection');

function getAllMovies() {
    return knex('movies')
    .select('*');
  };


  function getSingleMovieById(id) {
    return knex('movies')
    .select('*')
    .where({ id: parseInt(id) });
  };
  function getSingleMovieByName(name) {
    var like = `%${name}%`;
    return knex('movies')
    .select('*')
    .where('name','like',`%${name}%`);
  };
  function addMovie(movie) {
    return knex('movies')
    .insert(movie)
    .returning('*');
  };

  function updateMovie(id, movie) {
    return knex('movies')
    .update(movie)
    .where({ id: parseInt(id) })
    .returning('*');
  };
  function deleteMovie(id) {
    return knex('movies')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
  };
  module.exports = {
    getAllMovies,
    getSingleMovieById,
    getSingleMovieByName,
    addMovie,
    updateMovie,
    deleteMovie
  };