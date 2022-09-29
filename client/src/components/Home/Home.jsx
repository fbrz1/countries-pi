import React, {Fragment} from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, byContinent} from '../../actions/index.js'
import {NavLink} from 'react-router-dom';
import {Card} from '../Card/Card'
import {SearchBar} from '../SearchBar/SearchBar'
import Paginado from '../Paginado/Paginado'
import Loading from '../Loader/Loading'
import Message from '../Message/Message'
import s from './Home.module.css'

export const Home = () => {
  
  const dispatch = useDispatch();
  const allCountries = useSelector ((state)=> state.countries) // me trae del reducer el estado coutries
  // const activity = useSelector(state => state.activity)
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const indexOfLastCountry = currentPage * countriesPerPage // 9
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage // 9 - 9 = 0
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry) // toma una porcion del arreglo pasandole los index
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // const paginado = (pageNumber) => {
  //   if(pageNumber === 1) {
  //     setCurrentPage(pageNumber)
  //   } else {
  //     setCountriesPerPage(9)
  //     setCurrentPage(pageNumber)
  //   }
  //   console.log(pageNumber)
  // }

  const max = Math.ceil(allCountries.length/countriesPerPage)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(()=> {
    dispatch(getCountries());
  }, [dispatch])
  
  
  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries())
  }

  function handleClickOrder(e){
    e.preventDefault();
    dispatch(getCountries(e.target.value))
    setCurrentPage(1)
  }

  function handleClickOrderPop(e) {
    e.preventDefault();
    dispatch(getCountries(e.target.value))
  }

  function handleFilterContinent(e) { // despacho la accion byContinent de mi reducer con el valor que se manda por el value del option
    e.preventDefault()
    console.log(e.target.value)
    dispatch(byContinent(e.target.value))
  }

    return (
    <div>
        <NavLink to= '/activity'> Crear Actividad</NavLink>
        <hr />
        <button className="button" onClick={e=> {handleClick(e)}}>Volver a cargar los countries</button> 
        <SearchBar />
        <div>
            <Paginado 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            max={max}
            />
            </div>
        <div>
            <select className={s.select} onChange={(e)=> handleClickOrder(e)}>
                <option value="AZ">A-Z</option>
                <option value="ZA">Z-A</option>
            </select>
            <select onChange={(e)=> handleClickOrderPop(e)}>
                <option value="PopHighToLow">Max Poblation</option>
                <option value="PopLowToHigh">Min Poblation</option>
            </select>
            <select onChange={(e)=>handleFilterContinent(e)}>
            <option value="All">All continents</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antartica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="North America">Norte America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">Sudamerica</option>
            </select>
            {/* <select onChange={handleActivity}>
                <option value="All">All Activities</option>
                {
                   activity.map(e => (
                    <option value={e} key={e}>{e}</option>
                ))
                }
            </select> */}
          
            <div className={s.containerCard}>
            {
                allCountries.length ? currentCountries.map((el) => {
                    return (
                    <Fragment key={el.id}>
                    <div className={s.cartas}>
                    {loading && <Loading />}
                    {error && <Message />}
                    {allCountries && <Card key={el.id} name={el.name} img={el.flagimg} code={el.id} continent={el.continent} capital={el.capital} population={el.population} subregion={el.subregion} />}
                    
                    </div>
                    </Fragment>
                )}) : <div className={s.noHay}>
                <p>No hay paises con ese nombre, intenta otra busqueda</p>
              </div> 
            } 
            </div>

        </div>
    </div>
  )
}
