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

//sumar salario
router.get('/sumaSalario', (req, res) => {
    conexion.query( `
    SELECT fecha_contratacion, SUM(salario) as totalSalarios
    FROM empleados
    WHERE pagado = 1
    GROUP BY fecha_contratacion
    ORDER BY fecha_contratacion
  `, (err, empleadosPorFecha) => {
      if (err) {
        console.error('Error al consultar salarios por fecha: ' + err.stack);
        return res.status(500).send('Error en el servidor');
      }

      conexion.query(`
      SELECT SUM(salario) as totalSalariosGeneral
      FROM empleados
      WHERE pagado = 1  
    `, (err, resultadoTotalSalarios) => {
        if (err) {
          console.error('Error al consultar total general de salarios: ' + err.stack);
          return res.status(500).send('Error en el servidor');
        }
  
        const totalSalariosGeneral = resultadoTotalSalarios[0].totalSalariosGeneral;
  
        res.render('sumaSalario', { empleadosPorFecha, totalSalariosGeneral });
      });
    });
  });


  router.post('/pagado/:empleado_id', (req, res) => {
    const empleado_id = req.params.empleado_id;

    // Actualiza el estado "pagado" a 1 para el empleado con el ID proporcionado
    conexion.query(
        'UPDATE empleados SET pagado = 1 WHERE id = ?',
        [empleado_id],
        (err) => {
            if (err) {
                console.error('Error al actualizar el estado "pagado": ' + err.stack);
                return res.status(500).send('Error en el servidor');
            }

            res.redirect('/registrar'); // Redirige a la página de totales después de la actualización
        }
    );
});

module.exports = router