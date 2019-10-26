const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers');
const vacantesControllers = require('../controllers/vacantesControllers');
const usuariosControllers = require('../controllers/usuariosControllers');

module.exports = () => {
    router.get('/', homeControllers.mostrarTrabajos);

    //Crear vacantes
    router.get('/vacantes/nueva', vacantesControllers.formularioNuevaVacante);
    router.post('/vacantes/nueva', vacantesControllers.agregarVacante);

    //mostrar vacante
    router.get('/vacante/:url', vacantesControllers.mostrarVacante);

    //editar vacantes
    router.get('/vacante/editar/:url', vacantesControllers.formEditarVacante);
    router.post('/vacante/editar/:url', vacantesControllers.editarVacante);

    //Crear cuentas
    router.get('crear-cuenta', usuariosControllers.formCrearCuenta);
    router.post('crear-cuenta', 
        usuariosControllers.validarRegistro,
        usuariosControllers.crearUsuario);
    return router;
}