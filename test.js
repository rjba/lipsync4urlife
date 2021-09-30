var app = require('./app');
var supertest = require("supertest");
var assert = require('assert');

/* Test pour voir que la recherche de chanson retourne bien
  un format json et qu'on a une réponse succés
*/
describe('GET /search-song/Kendrick Lamar', function() {
    it('responds with json', function(done) {
        supertest(app)
            .get('/search-song/Kendrick Lamar')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


/* Test pour voir que pour une chanson donnée
  on a bien une reponse 200 qui est retournée.
  Que les données sont bien au format json.
  Et que l'id de la chanson retournée est bien l'id passé en url
*/
describe('GET /get-info-on-song/5312186', function() {
    it('responds with json', function(done) {
        supertest(app)
            .get('/get-info-on-song/5312186')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert(response.body.data.response.song.id, 5312186)
                done();
            })
            .catch(err => done(err))
    });
});
