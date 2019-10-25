const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers');
const vacantesControllers = require('../controllers/vacantesControllers');

module.exports = () => {
    router.get('/', homeControllers.mostrarTrabajos);

    //Crear vacantes
    router.get('/vacantes/nueva', vacantesControllers.formularioNuevaVacante);
    router.post('/vacantes/nueva', vacantesControllers.agregarVacante);

    //mostrar vacante
    router.get('/vacante/:url', vacantesControllers.mostrarVacante);
    return router;
}