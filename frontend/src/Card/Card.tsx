import React from 'react'
import styles from './Card.module.css'

type CardProps={
   desc:string; 
   title:string;
   img:string;
}

function Card(props:CardProps){
    return(
        <div className={styles['card']}>
            <img className={styles['card-image']} src={props.img} alt="kinematics sim picture"></img>
            <h2 className={styles['card-title']}>{props.title}</h2>
            <hr color='black'></hr>
            <p className={styles['card-desc']}>{props.desc}</p>
        </div>
    );
}

export default Card;