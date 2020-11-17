import React, { Component } from "react";

import styles from "./styles.module.scss";
import Container from "./../Container";

class index extends Component {
    render() {
        return (
            <Container>
                <div className={styles.dashboard}>
                    <nav>
                        <h2>WELCOME QUDUSAYO</h2>
                        <button>LogOut</button>
                    </nav>
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
                </div>
            </Container>
        );
    }
}

export default index;
