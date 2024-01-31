const express = require('express')
const router = express.Router()
const conexion = require('./database/coneccion')

router.get('/', (req, res) => {
    res.render('index')

})
router.get('/registrar', (req, res) => {
    const buscar = req.query.buscar;

    if (buscar) {
        conexion.query(`SELECT * FROM empleados WHERE departamento LIKE '%${buscar}%'`, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.render('registrar', { result: result, buscar: buscar });
            }
        });
    } else {
        conexion.query('SELECT * FROM empleados', (err, result) => {
            if (err) {
                throw err;
            } else {
                res.render('registrar', { result: result });
            }
        });
    }
});
const controlador = require('./controllers/controlador')
router.post('/guardar', controlador.save)

//rutas Tarea
router.get('/tareas',(req,res)=>{
    conexion.query('SELECT * FROM empleados',(err,result)=>{
        if(err)
        throw err
    else
    res.render('tarea',{result:result})
    })
})
router.post('/crearTareas',controlador.tareas)


module.exports = router