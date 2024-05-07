const chai = require('chai');
const mongoose = require('mongoose');
const Student = require('../models/studentModel');

const expect = chai.expect;

describe('Student Model', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/studentDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    mongoose.connection.db.dropDatabase()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('should create and save a new student', (done) => {
    const student = new Student({
      name: 'Test 2',
      courseName: 'Music',
      grade: 'HD',
      score: 95,
      link: 'http://music.com'
    });
    student.save()
      .then((savedStudent) => {
        expect(savedStudent.name).to.equal('Test 2');
        expect(savedStudent.courseName).to.equal('Music');
        expect(savedStudent.grade).to.equal('HD');
        expect(savedStudent.score).to.equal(95);
        expect(savedStudent.link).to.equal('http://music.com');
        done();
      })
      .catch((err) => done(err));
  });

  it('should find and delete a student', (done) => {
    Student.findOneAndDelete({ name: 'Test 2' })
      .then(() => Student.findOne({ name: 'Test 2' }))
      .then((deletedStudent) => {
        expect(deletedStudent).to.be.null;
        done();
      })
      .catch((err) => done(err));
  });
});
