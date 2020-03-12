const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('BASE CASE DB Empty', () => {
    describe('GET /', () =>{
        it('GET should return 200', (done) => {
            chai.request(server)
              .get('/appt')
              .end((err, res) =>{
                  res.should.have.status(200);
                  done();
              });
        });
    });
    describe('GET ID', () => {
        it('GET ID should return 400', (done) => {
            const id = 1;
            chai.request(server)
              .get(`/appt/${id}`)
              .end((err, res) => {
                  res.should.have.status(400);
                  done();
              });
        });
    });
    describe('UPDATE ID', () => {
        it('PUT ID should return 404', (done) => {
            const id = 2;
            chai.request(server)
              .put(`/appt/update/${id}`)
              .end((err, res) => {
                  res.should.have.status(404);
                  done();
              });
        });
    });
    describe('DELETE ID', () => {
        it('DELETE ID should return 400', (done) => {
            const id = 3;
            chai.request(server)
              .delete(`/appt/delete/${id}`)
              .end((err, res) => {
                  res.should.have.status(400);
                  done();
              });
        });
    });
});
