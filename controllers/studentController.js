const express = require('express');
const Student = require('../models/studentModel');
const router = express.Router();
const { io } = require('../server');

router.get('/', async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find({});

    // Render the index view with the students data
    res.render('index', { students });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving students");
  }
});

router.post('/addStudent', async (req, res) => {
  try {
    const newStudent = new Student({
      name: req.body.studentName,
      courseName: req.body.courseName,
      grade: req.body.grade,
      score: req.body.score,
      link: req.body.link
    });

    await newStudent.save();

    // Redirect to home page
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding student");
  }
});

router.post('/deleteStudent', async (req, res) => {
  try {
    const id = req.body.id;
    await Student.findByIdAndDelete(id);

    // Redirect to home page
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting student");
  }
});

router.post('/editStudent/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Student.findByIdAndUpdate(id, {
      name: req.body.studentName,
      courseName: req.body.courseName,
      grade: req.body.grade,
      score: req.body.score,
      link: req.body.link
    });

    // Redirect to home page
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating student");
  }
});

module.exports = router;
