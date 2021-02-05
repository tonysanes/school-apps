const { Router } = require('express');
const router = Router();

const { getGrades, getStudents, createStudent, deleteStudent } = require('../controllers/index.controller');

router.get('/students/grades', getGrades);
router.get('/students', getStudents);
router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;