const { Pool } = require('pg');
const multer = require('multer');
const fs = require("fs")

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
    const response = await pool.query('SELECT * FROM schooldb.alumno_view');
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
};

//Upload
const store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});

const upload = multer({storage:store}).single('file');

const uploadFile = (req, res, next) => {
    upload(req, res, function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
};

//remove file
const path = "./uploads/";

const removeFile = (req, res) => {
    const filename = parseInt(req.params.filename);
    const pathToFile = path + filename;
    fs.unlink(pathToFile, function(err) {
        if (err) {
          throw err
        } else {
          console.log("Successfully deleted the file.")
        }
        res.status(200).json(filename + "deleted Successfully.");
    });
} ;

module.exports = {
    getGrades,
    createStudent,
    getStudents,
    deleteStudent,
    uploadFile,
    removeFile
}