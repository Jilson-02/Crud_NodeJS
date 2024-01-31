const conexion = require('../database/coneccion')

exports.save = (req, res) => {
    const nombreEm = req.body.nombreEm
    const fecha_contratacion = req.body.fecha_contratacion
    const salario = req.body.salario
    const horas_trabajadas = req.body.horas_trabajadas
    const departamento = req.body.departamento
    const pagado = 0
    if (!nombreEm || !fecha_contratacion || !salario || !horas_trabajadas || !departamento) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }
    conexion.query('INSERT INTO empleados SET ?', { nombreEm: nombreEm, fecha_contratacion: fecha_contratacion, salario: salario, horas_trabajadas: horas_trabajadas, departamento: departamento }, (err, results) => {
        if (err)
            throw err

        else
            res.redirect('/registrar')
    })
}
