'use strict';
process.env.MONGO_URI = 'mongodb://localhost:27017/voting-app-test';
require('../server');
let mongoose = require('mongoose');
let models = require('../models');
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let expect = chai.expect;
let User = models.User;
var token;
var port = 'localhost:3000';
var userId;
var pollId;

describe('Restful API', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('Signup/Login routes', function() {

    it('Should create a new user', function(done) {
      chai.request(port)
        .post('/signup')
        .send({name: 'alem', password: 'password'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.data.name).to.eql('alem');
          expect(res.body.data).to.have.property('_id');
          done();
        });
    });

    it('Should be able to login', function(done) {
      chai.request(port)
        .get('/login')
        .auth('alem', 'password')
        .end((err, res) => {
          token = res.body.token;
          userId = res.body.data._id;
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });


  }); //End signup/login

  describe('User routes', function() {

    it('Should get a user', function(done) {
      chai.request(port)
        .get('/users/'+userId)
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.data._id).to.eql(userId);
          done();
        });
    });

    it('Should update a user', function(done) {
      chai.request(port)
        .put('/users/'+userId)
        .set('token', token)
        .send({name: 'Asefa'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('Update successful!');
          done();
        });
    });

    it('Should remove a user', function(done) {
      chai.request(port)
        .del('/users/'+userId)
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('User removed!');
          done();
        });
    });


  }); //End User routes

  describe('Poll routes', function() {

    beforeEach(function(done) {
      var newUser = new User({name:'alem', password:'password'});
      newUser.save((err, user) => {
        if(err) throw err;
        userId = user._id;
        done();
      });
    });

    it('Should get all polls', function(done) {
      chai.request(port)
        .get('/polls')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.data).to.be.instanceof(Array);
          done();
        })
    });

    it('Should create a poll', function(done) {
      chai.request(port)
        .post('/users/' + userId + '/polls')
        .set('token', token)
        .send({name:'Games', options:[{name:'War'}] })
        .end((err, res) => {
          pollId = res.body.data._id;
          expect(err).to.eql(null);
          expect(res.body.success).to.eql(true);
          done();
        });
    });

    it('Should get one poll', function(done) {
      chai.request(port)
        .get('/users/' + userId + '/polls/' + pollId)
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.data.name).to.eql('Games');
          done();
        });
    });

    it('Should update a poll', function(done) {
      chai.request(port)
        .put('/users/' + userId + '/polls/' + pollId)
        .set('token', token)
        .send({name: 'Cars'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('Poll updated!');
          done();
        });
    });

    it('Should delete a poll', function(done) {
      chai.request(port)
        .del('/users/' + userId + '/polls/' + pollId)
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('Poll deleted!');
          done();
        });
    });


  }); //End Poll routes




}); //End Restful API
