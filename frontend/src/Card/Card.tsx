import React from 'react'
import styles from './Card.module.css'
import {Link} from "react-router-dom";

type CardProps={
   desc:string; 
   title:string;
   img:string;
   ref:string;
}

function Card(props:CardProps){
    return(
        <div className={styles['card']}>
            <Link to={props.ref}>
                <img className={styles['card-image']} src={props.img}alt="kinematics sim"></img>
            </Link>
            <h2 className={styles['card-title']}>{props.title}</h2>
            <hr color='black'></hr>
            <p className={styles['card-desc']}>{props.desc}</p>
        </div>
    );
}

export default Card;