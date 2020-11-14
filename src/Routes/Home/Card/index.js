import React from 'react'
import styles from './style.module.scss'

function index(props) {
    return (
        <div className={[styles.card, styles[props.styles], styles[props.network]].join(" ")}>
            {props.src? <img alt="symbol" src={props.src} />: null}
            <h4>{props.title}</h4>
            <p>{props.info}</p>
            {props.children}
        </div>
    )
}

export default index
