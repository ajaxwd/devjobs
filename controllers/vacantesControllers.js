const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante'); 

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    })
}

//agregar vacantes a la base de datos
exports.agregarVacante = async (req, res) => {
    const vacantes = new Vacante(req.body);

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
        nombrePagina: `Editar - ${vacante.titulo}`
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











