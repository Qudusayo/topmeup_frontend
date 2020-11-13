import React from 'react'
import styles from './style.module.scss'

function index(props) {
    return (
        <div className={[styles.card, styles[props.styles]].join(" ")}>
            <img alt="symbol" src={props.src} />
            <h4>{props.title}</h4>
            <p>{props.info}</p>
        </div>
    )
}

export default index
