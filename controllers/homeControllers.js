const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante'); 

exports.mostrarTrabajos = async (req, res, next) => {

    const vacante = await Vacante.find();

    if(!vacante) return next();

    res.render('home', {
        nombrePagina: 'devjobs',
        tagline: 'Encuentra y publica trabajos para Desarrolldores Web',
        barra: true,
        boton: true,
        vacante
    })
}