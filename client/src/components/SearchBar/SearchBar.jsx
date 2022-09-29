import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getNameCountry} from '../../actions/index.js'
import s from './SearchBar.module.css'

export const SearchBar = () => {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    
    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
    }
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getNameCountry(name))
        setName('')
        console.log(name)
    }


    return (
        <div className="form">
            <input className={s.searchBar} 
            type="text"
            placeholder="Buscar..."
            onChange={(e)=> handleInputChange(e)} 
             />
            <button type="submit" className={s.buttonSearch} onClick={(e)=>handleClick(e)}>Buscar</button>
        </div>
    )

}