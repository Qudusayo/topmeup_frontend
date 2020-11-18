import React, { Component } from "react";
import Wrapper from './../../Components/Container'

import styles from './style.module.scss'

class index extends Component {
    render() {
        return (
            <Wrapper>
                <div className={styles.card}>
                    <button>+</button>
                    <div>
                        <h2>Balance</h2>
                        <h1>₦ 45,000</h1>
                        <p>As at 11/11/2020</p>
                    </div>
                </div>
                <div className={styles.cards}>
                    <div>DATA BUNDLE</div>
                    <div>AIRTIME TOPUP</div>
                    <div>UTILITY BILLS</div>
                </div>
                <div className={styles.cards}>
                    <div>TV SUBSCRIPTION</div>
                    <div>SCRATCH CARD</div>
                    <div>TRANSFER MONEY</div>
                </div>
            </Wrapper>
        );
    }
}

export default index;
