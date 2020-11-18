import React, { Component } from "react";

import styles from "./styles.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div className={styles.dashboard}>
                    <nav>
                        <div className={styles.hamburger}>
                            <input
                                type="checkbox"
                                tabIndex="-1"
                                id="checkbox"
                                className={styles.hamburger_check}
                                defaultChecked={this.props.visible}
                                onChange={() => this.props.setVisibility()}
                            />
                            <label htmlFor="checkbox">
                                <span className={styles.hamburger_bars}></span>
                                <span className={styles.hamburger_bars}></span>
                                <span className={styles.hamburger_bars}></span>
                            </label>
                        </div>
                        <h2>WELCOME QUDUSAYO</h2>
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
            </>
        );
    }
}

export default Index;
