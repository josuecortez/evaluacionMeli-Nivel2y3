const request = require('supertest');
const app = require('../server');

describe(' /mutant - Network ', function() {
    it('POST responde 200 ', function(done) {
      request(app)
        .post('/mutant')
        .send({dna: ["AAAAAA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
    it('POST responde 403 ', function(done) {
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
