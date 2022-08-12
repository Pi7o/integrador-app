import './index.scss'

import React, { useEffect, useState } from 'react'
import {  Navigate } from 'react-router-dom'

function Base() {
  const [redirect, setRedirect] = useState(false);
  const [query,setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  //validaciones
  const [noFullBlanco, setNoFullBlanco] = useState(false);
  const [esMasdeTres, setEsMasdeTres] = useState(false)
  const [itsBeenReqInputs, setItsBeenReqInputs] = useState(false);
  const [esValido, setEsValido] = useState(false)  

  const actualizarQuery = (event) => {
    let elinput = event.target.value;
    console.log(elinput);
    //actualizamosQuery
    setQuery(searchInput);    
  };

  useEffect(() => {
    //para controlar si hubo almenos 3 caracteres en la barra de busqueda
    let temporal = searchInput;
    
    if (temporal.length >2) {
      setItsBeenReqInputs(true)
     };
    //para controlar si es valido
    if (itsBeenReqInputs) {
      
      if (temporal.trim().length !== 0){
        setNoFullBlanco(true);
      }else setNoFullBlanco(false);
      
      if (temporal.trim().length >2){
        setEsMasdeTres(true)
      }else setEsMasdeTres(false);

      if (noFullBlanco && esMasdeTres ){
        setEsValido(true)
      }else setEsValido(false);
    }
    console.log(searchInput);
    console.log(itsBeenReqInputs);
    console.log(noFullBlanco);
    console.log(esMasdeTres);
    console.log(esValido);

    
  }, [esValido, itsBeenReqInputs,searchInput,noFullBlanco,esMasdeTres])
  
  
  const irANoticias = otroevent =>{
    otroevent.preventDefault();
  
    if (esValido){
      setRedirect(true);
    } 
  }
  if (redirect && esValido)
    return <Navigate to = { {pathname: `/resultados?q=${query}`}} />

  return (
    <div className='container-base'>

        <form className='formulario-busqueda' onSubmit={irANoticias}>
          <input
            placeholder='Busca algo!'
            value={searchInput}
            onChange={event => {
              const val = event.target.value;
              setSearchInput(prev=>val);
              actualizarQuery(event);
            }}
            onBlur={(e) => actualizarQuery(e)}
          />
          <button id='boton' type='submit' disabled ={!esValido} onClick ={(e) => actualizarQuery(e)}>Buscar</button>
        </form>

        {(!esValido&&itsBeenReqInputs) ?
          <div className='errores'>
            <h3>Busqueda invalida!</h3>
            {(!noFullBlanco) ? <p>- Esta Vacio!</p> : <></>}
            {(!esMasdeTres) ? <p>- Contiene menos de 3 caracteres!</p> : <></>}
          </div> 
        
        : <></>}


    </div>
  )
}

export default Base