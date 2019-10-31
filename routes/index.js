const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers');
const vacantesControllers = require('../controllers/vacantesControllers');
const usuariosControllers = require('../controllers/usuariosControllers');
const authControllers = require('../controllers/authControllers');

module.exports = () => {
    router.get('/', homeControllers.mostrarTrabajos);

    //Crear vacantes
    router.get('/vacantes/nueva', 
        authControllers.autenticarUsuario,
        vacantesControllers.formularioNuevaVacante);
    router.post('/vacantes/nueva', 
        authControllers.autenticarUsuario,
        vacantesControllers.validarVacante,
        vacantesControllers.agregarVacante);

    //mostrar vacante
    router.get('/vacante/:url', vacantesControllers.mostrarVacante);

    //editar vacantes
    router.get('/vacante/editar/:url', 
        authControllers.autenticarUsuario,
        vacantesControllers.formEditarVacante);
    router.post('/vacante/editar/:url', 
        authControllers.autenticarUsuario,
        vacantesControllers.validarVacante,
        vacantesControllers.editarVacante);

    //Eliminar vacantes
    router.delete('/vacantes/eliminar/:id',
        vacantesControllers.eliminarVacante
    );

    //Crear cuentas
    router.get('crear-cuenta', usuariosControllers.formCrearCuenta);
    router.post('crear-cuenta', 
        usuariosControllers.validarRegistro,
        usuariosControllers.crearUsuario);

    //autentificar usuarios
    router.get('/iniciar-sesion', usuariosControllers.formIniciarSesion);
    router.post('/iniciar-sesion', authControllers.autenticarUsuario);

    //cerrar sesion
    router.get('/cerrar-sesion', 
        authControllers.autenticarUsuario,
        authControllers.cerrarSesion
    )

    //panel de administracion
    router.get('/administracion', 
        authControllers.autenticarUsuario,
        authControllers.mostrarPanel);

    //editar perfil
    router.get('/editar-perfil',
        authControllers.autenticarUsuario,
        usuariosControllers.formEditarPerfil
    );
    router.post('/editar-perfil',
        authControllers.autenticarUsuario,
        usuariosControllers.validarPerfil,
        usuariosControllers.editarPerfil
    );

    return router;
}