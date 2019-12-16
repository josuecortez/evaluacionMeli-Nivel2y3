const request = require('supertest');
const app = require('../server');
const db = require('../lib/mongo');

describe('Routes TEST ', function () {
  it('POST status 200 is Mutant', function(done) {
    request(app)
      .post('/mutant')
      .send({dna: ["AAAAAA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('POST status 403 is Human ', function(done) {
    request(app)
      .post('/mutant')
      .send({dna: ["CAGTCA","CAGTGC","TTATGT","AGAAGG","CCCTTA","TCACTG"]})
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
    it('GET stats return 200',function(done){
      request(app)
        .get('/stats')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  it('Conect to BD', function() {
    db('mongodb+srv://db_user_meli:db_user_meli@clustermeli-uxmue.mongodb.net/db_EvMeli?retryWrites=true&w=majority')
      .then((result) => {
        expect(result).to.equal('[db] Successfully connected');
        done();
      });
  });
});


