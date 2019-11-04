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
    },
    {
        "nombre" : "prueba 4",
        "etiquetas" : "planeamiento, español, segundo, 2, enero"
    },
]


class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {        
            htmlResultado : []
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

    tratarPalabras (texto) {
        //Quita las tildes de cada vocal
        let tmp=texto;
        if (isNaN(tmp)) {
            console.log("Etiqueta de tipo texto");            
            tmp = tmp.replace(/á/g, "a");
            tmp = tmp.replace(/é/g, "e");
            tmp = tmp.replace(/í/g, "i");
            tmp = tmp.replace(/ó/g, "o");
            tmp = tmp.replace(/ú/g, "u");
            //Convierte toda la cadena a minúscula
            tmp = tmp.toLowerCase();  
        }  
        return tmp;
    }


    buscador = () => {
        //console.log("lista", listaJson );
        let limiteListaJson = listaJson.length;
        let limiteEtiquetas = this.etiquetas.length;
        let tmpCoincidencias = 0;
        var htmlLista=[];

        //console.log("limiteEtiquetas", limiteEtiquetas );
        for (let index = 0; index < limiteListaJson; index++) {            
        //Ciclo con la cantidad de registros del json
        let sumaCoincidencias = 0;
            for (let i = 0; i < limiteEtiquetas; i++) {
                //Revisa cada una de las etiquetas que ha entrado el usuario con la propiedad "etiquetas" el registro actual (json)
                let tmpEtiqueta = this.tratarPalabras(this.etiquetas[i]);
                let pos = listaJson[index].etiquetas.search( tmpEtiqueta);
                //console.log("posicion de", tmpEtiqueta, "->", pos    ); 
                //Incrementa suma en caso de que haya Comprobación de coincidencias 
                if (pos > -1) {
                    sumaCoincidencias++;
                }                               
            }
            //Suma de coincidencias
            //console.log("Suam coincidencias", sumaCoincidencias, "en el registro del json:", index  );
           //console.log("limiteEtiquetas----",limiteEtiquetas, "****sumaCoincidencias", sumaCoincidencias   );
            
            if (limiteEtiquetas === sumaCoincidencias ) {
                /*  
                    Renderizado del regsitro
                    Condición que se da cuando todas las etiquetas ingresadas 
                    por el usuario coinciden con las etiquetas del registro actual              
                    del json. 
                */
               console.log("Renderizar:", listaJson[index] );
                let htmlGrupo = (
                        <h1 key={"grupo"+index} >  {listaJson[index].nombre}  </h1>
                )
               htmlLista.push (htmlGrupo);              
               this.setState({ htmlResultado: htmlLista });              
            
                                             
            }
            
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

            <div className="">
                {
                    this.state.htmlResultado
                }
            </div>

            </div>
         );
    }
}
 
export default Buscador;