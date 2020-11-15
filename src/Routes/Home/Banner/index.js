import React from 'react'
import styles from './style.module.scss'

function index() {
    return (
        <div className={styles.banner}>
            <h1 className={styles.bg}>TOP ME UP</h1>
            <div className={styles.content}>
                <small>We are to top you up</small>
                <h1>TOP<span className="yellow">ME</span>UP anytime anywhere</h1>
                <small>Buy cheap and affordable plans easily and cable subscriptions</small>
                <div className={styles.flex}>
                    <button>Register Now !</button>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}

export default index
