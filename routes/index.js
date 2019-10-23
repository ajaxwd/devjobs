const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers')

module.exports = () => {
    router.get('/', homeControllers.mostrarTrabajos);

    return router;
}