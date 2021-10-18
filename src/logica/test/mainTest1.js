// ........................................................
// mainTest1.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')
// ........................................................
// main ()
// ........................................................
describe( "Test 1: insertar una Medida", function() {
// ....................................................
// ....................................................
    var laLogica = null
// ....................................................
// ....................................................
    it( "conectar a la base de datos", function( hecho ) {
        laLogica = new Logica(
            "../bd/datos.bd",
            function( err ) {
                if ( err ) {
                    throw new Error ("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it
// ....................................................
// ....................................................
    it( "borrar todas las filas", async function() {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it
// ....................................................
// ....................................................
    it( "puedo insertar una medicion",
        async function() {
            await laLogica.insertarMedicion(
                {co2: "000000000", fecha: "00:00" } )
            var res = await laLogica.buscarMedicionPorFecha( "00:00" )
            assert.equal( res.length, 1, "¿no hay un resulado?" )
            assert.equal( res[0].co2, "000000000", "¿no es 000000000?" )
            assert.equal( res[0].fecha, "00:00", "¿no es 00:00?" )
        }) // it
// ....................................................
// ....................................................
    it( "no puedo insertar una medicion con fecha que ya está",
        async function() {
            var error = null
            try {
                await laLogica.insertarMedicion(
                    {co2: "000000000", fecha: "00:00" } )
            } catch( err ) {
                error = err
            }
            assert( error, "¿Ha insertado la fecha  que ya estaba 00:00? (¿No ha pasado por el catch()?" )
        }) // it
// ....................................................
// ....................................................
    it( "cerrar conexión a la base de datos",
        async function() {
            try {
                await laLogica.cerrar()
            } catch( err ) {
// assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
                throw new Error( "cerrar conexión a BD fallada: " + err)
            }
        }) // it
}) // describe