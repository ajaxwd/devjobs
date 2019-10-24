exports.mostrarTrabajos = (req, res) => {
    res.render('home', {
        nombrePagina: 'devjobs',
        tagline: 'Encuentra y publica trabajos para Desarrolldores Web',
        barra: true,
        boton: true
    })
}