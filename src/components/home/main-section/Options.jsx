import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Options.module.css'
import Button from '../../ui/Button'

const Options = () => {
   const navigate = useNavigate()

   const navigateCatalogClickHandler = () => {
      navigate('/catalog')
   }

   return (
      <nav className={classes.sectionOptions}>
         <div className={classes.optionsItem}>
            <select name="" id="">
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
            </select>
            <select name="" id="">
               <option value="Модель">Модель</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
            </select>
            <select name="" id="">
               <option value="Поколение">Поколение</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
            </select>
            <select name="" id="">
               <option value="Модификация">Модификация</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
            </select>
            <select name="" id="">
               <option value="Кузов">Кузов</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
               <option value="Производитель">Производитель</option>
            </select>
            <div>
               <Button
                  onClick={navigateCatalogClickHandler}
                  className={classes.optionsButton}
               >
                  Подобрать
               </Button>
            </div>
         </div>
      </nav>
   )
}

export default Options
