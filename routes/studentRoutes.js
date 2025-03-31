const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const multer = require('multer');

//set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const { name, age, email, address, phone } = req.body;
        const photo = req.file ? req.file.path:null  // Get the path of the uploaded file
        const newStudent = new Student({ name, age, email, address, phone, photo:photo });
        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
});

module.exports = router;
