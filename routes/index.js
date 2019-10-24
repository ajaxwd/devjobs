const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers');
const vacantesControllers = require('../controllers/vacantesControllers');

module.exports = () => {
    router.get('/', homeControllers.mostrarTrabajos);

    //Crear vacantes
    router.get('/vacantes/nueva', vacantesControllers.formularioNuevaVacante);

    return router;
}