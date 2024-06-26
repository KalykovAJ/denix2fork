import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import classes from './PathBasket.module.css'
import Button from '../../ui/Button'
import Like from '../../svg/Like'
import Guarantee from '../../../assets/icon/Guarantee.png'
import dostavka from '../../../assets/icon/dostavka.png'
import price from '../../../assets/icon/price.png'
import Loading from '../../ui/Loading'
import ModalCart from '../../ui/ModalCart'
import Notice from '../../ui/Notice'
import { setNotice } from '../../../store/noticeSlice'
import { setFavoritesInCatalog } from '../../../store/addNewProductSlice'
import { setFavoritesLocal } from '../../../store/newCardProductSlice'

import { cardPostAsync } from '../../../store/cardSlice'
import {
   addToFavorites,
   removeFavorites,
   setFavoritesLocalInFavorietsPage,
   setIsSelected,
} from '../../../store/favoritesSlice'

const PathBasket = ({ data, id }) => {
   const dispatch = useDispatch()
   const { isSelected } = useSelector((state) => state.favorites)
   const cartItems = useSelector((state) => state.cart.items)
   const cartStatus = useSelector((state) => state.cart.status)
   const productId = useSelector((state) => state.params.id)
   const navigate = useNavigate()
   const favorites = useMatch(`/favorites/${productId}`)
   const [showModal, setShowModal] = useState(false)
   const [counter, setCounter] = useState(1)

   const handleAddToFavorites = () => {
      dispatch(addToFavorites(data))
      dispatch(setFavoritesInCatalog(id))
      dispatch(setNotice('Добавлено в Избранное'))
   }

   const handleRemoveFromFavorites = () => {
      dispatch(setFavoritesInCatalog(id))
      dispatch(removeFavorites(id))
      dispatch(setNotice('Удалено с Избранного'))
   }

   const addToFavoritesHandler = () => {
      if (!data.isFavorites) {
         handleAddToFavorites()
      }
      if (data.isFavorites) {
         handleRemoveFromFavorites()
      }
   }

   useEffect(() => {
      if (isSelected) {
         setTimeout(() => {
            dispatch(setIsSelected(false))
            if (favorites) {
               navigate(-1)
            }
         }, 2000)
         if (!favorites) {
            dispatch(setFavoritesLocal())
         } else {
            dispatch(setFavoritesLocalInFavorietsPage())
         }
      }
   }, [dispatch, isSelected, favorites])

   const inputNumberChangeHandler = (e) => {
      const { value } = e.target
      const parsedValue = Number(value)
      if (
         !Number.isNaN(parsedValue) &&
         parsedValue >= 1 &&
         Number.isInteger(parsedValue) &&
         Number(parsedValue) <= 15
      ) {
         setCounter(parsedValue)
      }
   }

   const postCartChangeHandler = async () => {
      const itemExists = cartItems.find((item) => item.title === data.title)

      if (!itemExists) {
         await dispatch(
            cardPostAsync({
               quantity: counter,
               ...data,
            })
         )
      } else {
         setShowModal(true)
      }
   }

   const discount = data.discount || data.price

   return (
      <>
         <div>{cartStatus === 'loading' && <Loading />}</div>
         <div className={classes.container}>
            <div>
               {data.discount !== 0 && (
                  <p className={classes.numberThrough}>{data.price}</p>
               )}
            </div>
            <div className={classes.price}>
               <p>{discount}</p> <p>за 1 шт.</p>
            </div>
            <div className={classes.math}>
               <p>
                  {discount} × {counter} = {discount * counter}
               </p>
            </div>
            <div className={classes.blockUi}>
               <div>
                  <input
                     onChange={inputNumberChangeHandler}
                     value={counter}
                     type="number"
                     className={classes.noSpinArrows}
                  />
               </div>
               <Button onClick={postCartChangeHandler}>В корзину</Button>
               <button
                  onClick={addToFavoritesHandler}
                  className={classes.blockLike}
                  aria-label="Add To Favorites"
               >
                  <Like fill={data.isFavorites ? '#FF7E00' : ''} />
               </button>
            </div>

            <div className={classes.textBlock}>
               <p>В наличии</p>
               <div>
                  <img src={Guarantee} alt="cordiant" />
                  <p>Гарантия: Бессрочная от Cordiant</p>
               </div>
               <div>
                  <img src={dostavka} alt="cordiant" />
                  <p>Доставка:</p> <a href="/">Показать варианты (12)</a>
               </div>
               <div>
                  <img src={price} alt="cordiant" />
                  <p>Оплата: </p> <a href="/">Показать варианты (12)</a>
               </div>
            </div>
         </div>
         {showModal && <ModalCart onClose={() => setShowModal(false)} />}
         {isSelected && <Notice />}
      </>
   )
}

export default React.memo(PathBasket)
