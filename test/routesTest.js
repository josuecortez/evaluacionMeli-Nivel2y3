const request = require('supertest');
const app = require('../server');

describe('/mutant - Routes ', function() {
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
  });
