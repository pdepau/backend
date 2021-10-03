// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function( servidorExpress, laLogica ) {
// .......................................................
// GET /prueba
// .......................................................
    servidorExpress.get('/prueba', function( peticion, respuesta ){
    console.log( " * GET /prueba " )
    respuesta.send( "¡Funciona!" )
}) // get /prueba
// .......................................................
// GET /persona/<dni>
// .......................................................
servidorExpress.get('/medicion', async function( peticion, respuesta ){
    console.log( " * GET /medicion " )

// llamo a la función adecuada de la lógica
    var res = await laLogica.obtenerTodasLasMediciones()
// si el array de resultados no tiene una casilla ...
    if( res.length ==0 ) {
// 404: not found
        respuesta.status(404).send( "no encontre Mediciones")
        return
    }
// todo ok
    respuesta.send( JSON.stringify( res ) )
}) // get /medicion
} // cargar()
// .....................................................................
// .....................................................................