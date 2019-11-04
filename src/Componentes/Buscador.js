import React, { Component } from 'react';
import Taggle from 'taggle';
import 'taggle/src/minimal.css';


const listaJson = 
[
    {
        "nombre" : "prueba 1",
        "etiquetas" : "planeamiento, español, primero, 1, enero"
    },
    {
        "nombre" : "prueba 2",
        "etiquetas" : "planeamiento, matematica, primero, 1, diciembre"
    },
    {
        "nombre" : "prueba 3",
        "etiquetas" : "planeamiento, religion, religiosa,  segundo, 2, enero"
    }
]


class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buscarActivo : false
          }
        this.etiquetas = [];
    }


    componentDidMount () {
        const me = this;        
        new Taggle('divBuscador', {
        tags: ['Planeamiento' ],
        onTagAdd: function(event, tag) {
            console.log("etiqueta", tag);            
            me.etiquetas.push(tag);
        }
        });
    }

    handlerBuscar = () => {
       // console.log("Estiquetas", this.etiquetas );
        this.buscador();                
    }

    quitarTildes (texto) {
        let tmp=texto;
         tmp = tmp.replace(/á/g, "a");
         tmp = tmp.replace(/é/g, "e");
         tmp = tmp.replace(/í/g, "i");
         tmp = tmp.replace(/ó/g, "o");
         tmp = tmp.replace(/ú/g, "u");
        return tmp;
    }


    buscador = () => {
        //console.log("lista", listaJson );
        let limiteListaJson = listaJson.length;
        let limiteEtiquetas = this.etiquetas.length;
        let sumaCoincidencias = 0;
        console.log("limiteEtiquetas", limiteEtiquetas );
        for (let index = 0; index < limiteListaJson; index++) {
        //Ciclo con la cantidad de registros del json
            for (let i = 0; i < limiteEtiquetas; i++) {
                //Revisa cada una de las etiquetas que ha entrado el usuario con la propiedad "etiquetas" el registro actual (json)
                let tmpEtiqueta = this.quitarTildes(this.etiquetas[i]);
                let pos = listaJson[index].etiquetas.search( tmpEtiqueta);
                console.log("posicion de", tmpEtiqueta, "->", pos    ); 
                //Incrementa suma en caso de que haya Comprobación de coincidencias 
                if (pos > -1) {
                    sumaCoincidencias++;
                }                               
            }
            //Suma de coincidencias
            console.log("Suam coincidencias", sumaCoincidencias, "en el registro del json:", index  );
            
        }
  
    }


    render() { 
        return ( 
            <div className="container">
            <h1>Buscador</h1>
            <div  id="divBuscador"></div>            
          <div>
              <button id="btnBuscar" onClick={this.handlerBuscar} >Buscar</button>              
          </div>
            </div>
         );
    }
}
 
export default Buscador;