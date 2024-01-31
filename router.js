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
const crud = require('./controllers/controlador')
router.post('/guardar', crud.save)

module.exports = router