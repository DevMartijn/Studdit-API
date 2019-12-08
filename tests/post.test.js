const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Group = require('../models/group');
const User = require('../models/user');
const Post = require('../models/post');

chai.use(chaiHttp);
chai.should();

let testGroup = {
    id: null,
    name: 'TestGroup',
};

let testPost = {
    id: null,
    content: 'Post content'
};

describe('post.js tests', _ => {
    // Setup test database
    before(done => {
        Post.deleteMany({}).then(_ => {
            User.deleteMany({}).then(_ => {
                chai.request(app).post('/user').send({
                    username: 'waarom',
                    password: 'waarom12345'
                }).then(( res) => {
                    //if (err) throw err;
                    testPost.user = res.body.data._id;
                    if(res.body.data._id){
                        testGroup.admin = res.body.data._id;
                        chai.request(app).post('/group').send(testGroup).end( (err, res) =>{
                            if (err) throw err;
                            testGroup.id = res.body._id;
                            done();
                        })
                        //done();
                    }
                }).catch( err => { console.error( err )});
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

    it('POST /post/:id - Create post on a group', done => {        
        chai.request(app).post(`/post/${testGroup.id}`).send(testPost).end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });

    it('GET /post/:id - Return all posts from a group', done => {
        chai.request(app).get(`/post/${testGroup.id}`).end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('array');
            const post = res.body[0];
            post.should.have.property('content').eql(testPost.content);
            done();
        });
    });
});