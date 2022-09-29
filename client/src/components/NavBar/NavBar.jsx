import React from "react"
import { NavLink } from "react-router-dom";
import s from './NavBar.module.css';

export default function Nav(){
     return(
          <div className={`${s.navBar} ${s.navBarBg}`}>
               <div className={`${s.container} ${s.navBarDiv}`}>
                    <div>
                         <NavLink to="/" className={s.link}>Countries <span>API</span></NavLink>
                    </div>
                    <div className={`${s.links}`}>
                         <NavLink to="/countries"  className={s.link}>Paises</NavLink>
                         <NavLink to="/activity" className={s.link}>Agregar Actividad</NavLink>
                    </div>
               </div>
          </div>
     )
}