const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: '5432'
});

const getGrades = async (req, res) => {
    const response = await pool.query('SELECT * FROM schooldb.grado');
    res.status(200).json(response.rows);
} 
const getStudents = async (req, res) => {
    const response = await pool.query('SELECT * FROM schooldb.persona');
    res.status(200).json(response.rows);
} 
const createStudent = async (req, res) => {
    const { xnombre, xape_pat, xape_mat, xid_grado, xfecha_naci, xfoto_ruta, xnivel } = req.body;
    const response = await pool.query('SELECT schooldb.register_student($1, $2, $3, $4, $5, $6, $7)', [xnombre, xape_pat, xape_mat, xid_grado, xfecha_naci, xfoto_ruta, xnivel]);
    res.status(200).json(response.rows);
};

const deleteStudent = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const response1 = await pool.query('DELETE FROM schooldb.movimiento WHERE id_persona = $1', [id]);
    const response2 = await pool.query('DELETE FROM schooldb.persona WHERE nid_persona = $1', [id]);
    res.status(200).json(response2.rows);
} 

module.exports = {
    getGrades,
    createStudent,
    getStudents,
    deleteStudent
}