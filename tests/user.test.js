let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');

chai.use(chaiHttp);

let testUser = {
    id: null,
    username: 'Martijn',
    password: 'MartijnHeeffer'
}

describe('User tests', _ => {

    it('POST /user - Create a new user', done => {
        chai.request(app).post(`/user`).send(testUser).end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.have.property('data');
            testUser.username = res.body.username;
            done();
        });
    });

    it('DELETE /user - Delete new user', done => {
        chai.request(app).delete(`/user`).send({
            username: testUser.username,
            password: testUser.password
        }).end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            done();
        });
    });
});