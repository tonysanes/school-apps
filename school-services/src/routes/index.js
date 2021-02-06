const { Router } = require('express');
const router = Router();

const { getGrades, getStudents, createStudent, deleteStudent, uploadFile, removeFile } = require('../controllers/index.controller');

router.get('/students/grades', getGrades);
router.get('/students', getStudents);
router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent);

router.post('/upload', uploadFile);
router.delete('/file/:filename', removeFile);

module.exports = router;