process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : moviesUpdate', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('PUT /api/v1/movies', () => {
    it('should return the movie that was updated HERE error', (done) => {
      knex('movies')
      .select('*')
      .then((movie) => {
        const movieObject = movie[0];
        chai.request(server)
        .put(`/api/v1/movies/${movieObject.id}`)
        .send({
          rating: 9
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 movie object}
          res.body.data[0].should.include.keys(
            'id', 'name', 'genre', 'rating', 'reff'
          );
          // ensure the movie was in fact updated
          const newMovieObject = res.body.data[0];
          newMovieObject.rating.should.not.eql(movieObject.rating);
          done();
        });
      });
    });

    it('should throw an error if the movie does not exist', (done) => {
        chai.request(server)
        .put('/api/v1/movies/9999999')
        .send({
          rating: 9
        })
        .end((err, res) => {
          // there should an error
          should.exist(null);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "That movie does not exist."}
          res.body.message.should.eql('That movie does not exist.');
          done();
        });
      });
  });


});