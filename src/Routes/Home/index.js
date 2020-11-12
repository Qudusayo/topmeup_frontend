import React from 'react'
import styles from './style.module.scss';

import Banner from './Banner'

function index() {
    return (
        <div className={styles.home}>
            <Banner />
        </div>
    )
}

export default index
