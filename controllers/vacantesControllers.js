const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante'); 

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante',
        cerrarSesion: true,
        nombre: req.user.nombre
    })
}

//agregar vacantes a la base de datos
exports.agregarVacante = async (req, res) => {
    const vacantes = new Vacante(req.body);

    //usuario autor de la vacante
    vacantes.autor = req.user._id;

    //crear arreglo de habilidades (skills)
    vacantes.skills = req.body.skills.split(',');

    //guardar vacantes en e la base de datos
    const nuevaVacantes = vacantes.save();

    //redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);
}

//mostrar vacante
exports.mostrarVacante = async (req, res, next) => {

    const vacante = await Vacante.findOne({url: req.params.url});

    //si no hay resultado
    if (!vacante) return next();
    
    res.render('vacante', {
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
    })
}

//editar vacantes por url
exports.formEditarVacante = async (req, res, next) => {

    const vacante = await Vacante.findOne({url: req.params.url});

    if(!vacante) return next();

    res.render('editar-vacante', {
        vacante,
        nombrePagina: `Editar - ${vacante.titulo}`,
        cerrarSesion: true,
        nombre: req.user.nombre
    })
}

exports.editarVacante = async (req, res, next) => {

    const vacanteActualizada = req.body;

    vacanteActualizada.skills = req.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate({url: req.params.url},
        vacanteActualizada, {
            new: true,
            runValidators: true
    });

    res.redirect(`/vacantes/${vacante.url}`);
}

//validar y sanitizar los campos de la nueva vacante
exports.validarVacante = (req, res, next) => {
    //sanitizar campos

    req.sanitizeBody('titulo').escape();
    req.sanitizeBody('empresa').escape();
    req.sanitizeBody('ubicacion').escape();
    req.sanitizeBody('salario').escape();
    req.sanitizeBody('contrato').escape();
    req.sanitizeBody('skills').escape();

    //validar
    req.checkBody('titulo', 'Agrega un titulo a la vacante').notEmpty();
    req.checkBody('empresa', 'Agrega una empresa').notEmpty();
    req.checkBody('ubicacion', 'Agrega una ubicación').notEmpty();
    req.checkBody('contrato', 'Selecciona un contrato').notEmpty();
    req.checkBody('skills', 'Agrega al menos una habiidad').notEmpty();

    const errores = req.validatorErrors();

    if(errores){
        // Recargar la vista de errores
        req.flash('error', errores.map(error => error.msg()));

        res.render('nueva-vacante', {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el formulario y publica tu vacante',
            cerrarSesion: true,
            nombre: req.user.nombre,
            mensajes: req.fash()
        })
    }

    next()// siguiente middleware
}

exports.eliminarVacante = async (req, res) => {
    const { id } = req.params;

    const vacante = await Vacante.findById(id);

    if(verificarAutor(vacante, req.user)){
        // Todo bien, si es el usuario, eliminar
        vacante.remove();
        res.status(200).send('Vacante Eliminada Correctamente');
    } else {
        // no permitido
        res.status(403).send('Error')
    }


    
}

const verificarAutor = (vacante = {}, usuario = {}) => {
    if(!vacante.autor.equals(usuario._id)) {
        return false
    } 
    return true;
}











