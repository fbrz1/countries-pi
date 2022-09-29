import React from 'react'
import {Link} from 'react-router-dom';
import s from "./Card.module.css";

export const Card = ({name, img, code, continent, capital, population, subregion}) => {
  return (
    <div>
    <div className="countries">
        <h3>{name}</h3>
        <img className={s.countryimg} src={img} alt="imagen no encontrada" width="300px" height="200px"/>
        <div className={s.countryInfo}>
        <p><span>Codigo:</span> {code}</p>
        <p><span>Continente</span>: {continent}</p>
        <p><span>Poblacion:</span> {population}</p>
        <Link to={`/countries/${code}`} className={s.button}>Mas informacion</Link>
        </div>
    </div> 
     </div> 
  )
}
