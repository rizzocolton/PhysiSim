import React from 'react'
import physiSimLogo from '../assets/physisimlogo.png'
import styles from './Card.module.css'

function Card(){
    return(
        <div className={styles['card']}>
            <img className={styles['card-image']} src={physiSimLogo} alt="kinematics sim picture"></img>
            <h2 className={styles['card-title']}>Kinematics</h2>
            <p className={styles['card-desc']}>A simple single object simulation of projectile motion in a uniform gravitational field</p>
        </div>
    );
}

export default Card;