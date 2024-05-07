const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  courseName: String,
  grade: String,
  score: Number,
  link: String
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
