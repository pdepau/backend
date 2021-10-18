/**
 *
 * AUTOR: Pau Blanes Climent
 * FECHA: 17/10/2021
 * DESCRIPCION: clase para las peticiones HTTP
 *
 */
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

    servidorExpress.post('/medicion/:data', async function( peticion, respuesta ){
        console.log( " * POST /medicion " )
        console.log(peticion.params.data)
        var datos= JSON.parse(peticion.params.data)
// llamo a la función adecuada de la lógica
        var res = await laLogica.obtenerTodasLasMediciones()
// si el array de resultados no tiene una casilla ...
        await laLogica.insertarMedicion(datos)
            .catch(err => respuesta.status(404).send("no se ha podido insertar medida"))
            .then(res => respuesta.status(200).send("se inserto"))
// todo ok

    })
// .......................................................
    // .......................................................
    // GET /medicion/cuantas/<cuantas>
    // .......................................................
    servidorExpress.get('/medicion/cuantas/:cuantas', async function (peticion, respuesta) {
        console.log(" * GET /medicion/cuantas ")
        // averiguo cuantas
        let cuantas = peticion.params.cuantas
        // llamo a la función adecuada de la lógica
        let res = await laLogica.obtenerUltimasMediciones(cuantas)
        // si el array de resultados no tiene personas ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré medidas")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /medida/cuantas
    // .......................................................
// .......................................................
// GET /medicion/
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