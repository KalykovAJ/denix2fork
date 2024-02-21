import React from 'react'
import classes from './NewsAndArticles.module.css'
// import chess from '../../assets/image/img.png'
import time from '../../assets/icon/time.png'
import chess2 from '../../assets/image/imgadap.png'

const NewsAndArticles = ({ news }) => {
   return (
      <div className={classes.container}>
         <div className={classes.main}>
            <img className={classes.mainFoto} src={news.image} alt="" />
            <img className={classes.mainFoto2} src={chess2} alt="" />
            <p className={classes.text}>{news.title}</p>
            <div className={classes.tags}>
               {news.tags.map((tag) => (
                  <button key={tag.id} className={classes.receptionBtn}>
                     {tag.title}
                  </button>
               ))}
            </div>
            <div className={classes.timeDate}>
               <img className={classes.timeChess} src={time} alt="" />
               <p>12.12.2021</p>
            </div>
         </div>
      </div>
   )
}

export default NewsAndArticles
