import './index.scss'

import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import NewsItem from '../NewsItem';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import ANewsItem from '../NewsItem/newindex';

axios.defaults.headers.common = {
  "X-API-Key": "7c6a19da16bb481c95446c04f010eed1",
};

function NewsList() {
    //en caso de ya tener una query lo obtenemos
    const [searchParams, setSearchParams] = useSearchParams()
    const queryenurl = searchParams.get('q') || '';
    //creamoms una variable donde almacenar articulos
    const [articulos, setArticulos] = useState([]);
    //para mostrar cargando
    const [isLoading, setIsLoading] = useState(true);
    //paginado
    const [paginaActual, setPaginaActual] = useState(0)
    const [cantidadArticulos,setCantidadArticulos] = useState(10)
    const [totalPaginas,setTotalPaginas] = useState(0);
    //Para setear que es lo que pedimos
    const [query,setQuery] = useState(queryenurl);
    const [searchInput, setSearchInput] = useState("");
    //Validaciones
    const [Cargar, setCargar] = useState(true);
    const [noFullBlanco, setNoFullBlanco] = useState(false);
    const [esMasdeTres, setEsMasdeTres] = useState(false)
    const [itsBeenReqInputs, setItsBeenReqInputs] = useState(false);
    const [esValido, setEsValido] = useState(true)
    const [sinResultados, setSinResultados] = useState(false)
    //Manejamos el cambio de pagina aqui
    const handlerCambioPagina = event => {
      console.log(event);
      setPaginaActual(event.selected);
      setCargar(true);
      setEsValido(true);
    }

    const manejoFormulario = event => {
      event.preventDefault();
      setPaginaActual(0);
      setSearchParams({q:searchInput});
      setQuery(searchInput);
      setCargar(true);
    }

    useEffect(() => {
      if (Cargar){setIsLoading(true)};
      if (esValido && Cargar){
        const fetchData = async () =>{

        try {
          const {data} = await axios
          //q=Apple&from=2022-08-08&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWSAPI_KEY} placeholder de ejemplo
          .get(
            `https://newsapi.org/v2/everything`,
            {
              params:{
                q:query,
                page: paginaActual+1,
                pageSize:cantidadArticulos,
                language:'es'
              },
            }
            );
          const {articles, totalResults} = data;
          setArticulos(articles) ;
          setTotalPaginas(totalResults);
          if (totalResults===0){setSinResultados(true)} else{ setSinResultados(false)};

          console.log(data)
        } catch (error) {
          console.log(error)          
        } finally{
          setIsLoading(false)
          setEsValido(false);
          setCargar(false);
          setItsBeenReqInputs(false);
        }
        };
        fetchData();   
        
      }  
      //para controlar si hubo almenos 3 caracteres en la barra de busqueda
      let temporal = searchInput;
      if (temporal.length >2 && !isLoading) {
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
            
    }, [paginaActual,query,cantidadArticulos,esValido,Cargar,itsBeenReqInputs,searchInput,totalPaginas,esMasdeTres,noFullBlanco,isLoading])
    
  return ( 
    <div>
      <div className='container-resultados'>
        <h1> Resultados de busqueda! </h1>
        <form className='formulario-busqueda' onSubmit={manejoFormulario}>
        <input
          placeholder='Busca algo!'
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />
        <button type='submit' disabled ={!esValido} >Buscar</button>
        </form>
        {(!esValido&&itsBeenReqInputs) ?
          <div className='errores'>
            <h3>Busqueda invalida!</h3>
            {(!noFullBlanco) ? <p>- Esta Vacio!</p> : <></>}
            {(!esMasdeTres) ? <p>- Contiene menos de 3 caracteres!</p> : <></>}
          </div> 
        
        : <></>}
      </div>
      <div className='container-noticias'>
        {(isLoading) ? 
            <p className='estado'>Cargando...</p> :
            
            (sinResultados) ?
              <p className='estado'>Sin Resultados!</p>:
              <>
              <p className='estado'>Esta viendo {Math.min(1+10*paginaActual,totalPaginas-9)}-{Math.min(10+10*paginaActual,totalPaginas)} noticias de {totalPaginas} resultados.</p>
              {articulos.map(
                (articulo,i) =>(
                    <ANewsItem articulo={articulo} key={i}
                    />
                  )
                )}   
              </>  
        }
      </div>
      <ReactPaginate
        nextLabel=">>"
        previousLabel="<<"
        breakLabel="..."
        forcePage={paginaActual}
        totalCount={totalPaginas}
        pageCount = {Math.ceil(totalPaginas/cantidadArticulos)}
        renderOnZeroPageCount={null}
        onPageChange={handlerCambioPagina}
        className="paginacion"
        activeClassName='pagina-actual'
        previousClassName='pagina-anterior-bot'
        nextClassName='pagina-siguiente-bot'
      />
    </div>
  )
}

export default NewsList