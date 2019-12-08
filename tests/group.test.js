const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Group = require('../models/group');
const User = require('../models/user');

chai.use(chaiHttp);
chai.should();

let testGroup = {
    id: null,
    name: 'testGroup'
};

describe('group.js tests', _ => {
    // Setup test database
    before(done => {
        Group.deleteMany({}).then(_ => {
            User.deleteMany({}).then(_ => {
                chai.request(app).post('/user').send({
                    username: 'waarom',
                    password: 'waarom12345'
                }).end((err, res) => {
                    if (err) throw err;
                    if(res.body.data._id){
                        testGroup.admin = res.body.data._id;
                        done();
                    }
                });
            });
        });
    });

    // Clean-up database
    after(done => {
        Group.deleteMany({}).then( _ => {
            User.deleteMany({ }).then( _ => {
                done();
            })
        })
    });

    it('POST /group - Create a new group', done => {
        chai.request(app).post('/group').send(testGroup).end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.have.property('_id');
            testGroup.id = res.body._id;
            done();
        });
    });

    it('GET /group/:id - Return new group', done => {
        chai.request(app).get(`/group/${testGroup.id}`).end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.have.property('name').eql(testGroup.name);
            done();
        })
    });

    it('GET /group - Return list of all groups', done => {
        chai.request(app).get('/group').end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('array');
            const group = res.body[0];
            group.should.have.property('name').eql(testGroup.name);
            done();
        });
    });

    it('DELETE /group/:id - Delete group', done => {
        chai.request(app).delete(`/group/${testGroup.id}`).end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            done();
        });
    });

});