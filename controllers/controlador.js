const conexion = require('../database/coneccion')

//Empleados
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

//Tareas

exports.tareas = (req, res) => {
    const { empleado_id, tiempoInvertido } = req.body;

    conexion.query('SELECT horas_trabajadas FROM empleados WHERE id = ?', [empleado_id], (err, resultadosEmpleado) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error interno del servidor');
        }

        const horas_trabajadas = resultadosEmpleado[0].horas_trabajadas;

        if (horas_trabajadas < tiempoInvertido) {
            const mensaje = 'El tiempo invertido en la tarea supera las horas trabajadas del empleado :(';
            return res.render('mensajeError', { mensaje });
        } else {
            const newTarea = {
                nombreTarea: req.body.nombreTarea,
                tiempoInvertido: req.body.tiempoInvertido,
                empleado_id : req.body.empleado_id 
            };

            conexion.query('INSERT INTO tareas SET ?', newTarea, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error interno del servidor');
                }

                const mensaje = 'Tareas Guardadas exitosamente';
                return res.render('mensajeExito', { mensaje });
            });
        }
    });
};