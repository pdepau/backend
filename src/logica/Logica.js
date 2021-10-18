/**
 *
 * AUTOR: Pau Blanes Climent
 * FECHA: 17/10/2021
 * DESCRIPCION: clase La comunicacion con el cliente
 *
 */
// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require( "sqlite3" )
// .....................................................................
// .....................................................................
module.exports = class Logica {
// .................................................................
// nombreBD: Texto
// -->
// constructor () -->
// .................................................................
    constructor( nombreBD, cb ) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            ( err ) => {
                if( ! err ) {
                    this.laConexion.run( "PRAGMA foreign_keys = ON" )
                }
                cb( err)
            })
    } // ()
// ..................................................................
// nombreTabla:Texto
// -->
// borrarFilasDe() -->
// ..................................................................
    borrarFilasDe( tabla ) {
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run(
                "delete from " + tabla + ";",
                (err)=> ( err ? rechazar(err) : resolver() )
            )
        })
    } // ()
// .................................................................
// borrarFilasDeTodasLasTablas() -->
// .................................................................
    async borrarFilasDeTodasLasTablas() {
        await this.borrarFilasDe( "Medicion" )
    } // ()
// .................................................................
// datos:{co2:N, fecha:Texto}
// -->
// insertarMedicion() -->
// .................................................................
    insertarMedicion( datos ) {
        var textoSQL = 'insert into Medicion ("co2","fecha","latitud","longitud") values( $co2, $fecha, $latitud, $longitud)';
var valoresParaSQL = { $co2: datos.co2, $fecha: datos.fecha, $latitud: datos.latitud,$longitud:datos.longitud}
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                ( err ? rechazar(err) : resolver() )
            })
        })
    } // ()

    obtenerUltimasMediciones(cuantos){
        var textoSQL = "select * from Medicion ORDER BY fecha DESC LIMIT $cuantos";
        var valoresParaSQL = { $cuantos: cuantos }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
                })
        })
    }

    obtenerTodasLasMediciones(){
        var textoSQL = "select * from Medicion";
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
                })
    })}
// ....................................................................
// cerrar() -->
// ....................................................................
    cerrar() {
        return new Promise( (resolver, rechazar) => {
            this.laConexion.close( (err)=>{
                ( err ? rechazar(err) : resolver() )
            })
        })
    } // ()
} // class
// .....................................................................
// .....................................................................
