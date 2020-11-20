import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

// import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: "45,000",
            reciever: "",
            amount: "",
            waiting: false,
        };
    }
    onChange() {}
    render() {
        return (
            <Wrapper>
                <form className={[styles.Form, styles.loose].join(" ")}>
                    <h1>Transactions</h1>
                    <h3>Your Previous Transactions</h3>
                </form>
                <div className={[styles.card, styles.loose].join(" ")}>
                    <div className={[styles.infos].join(" ")}>
                        <h4>Data Bundle</h4>
                        <p>22:44, Nov 12, 2020</p>
                    </div>
                    <h2>₦500</h2>
                    <div className={[styles.infos].join(" ")}>
                        <p>Topped Up: 07016412041</p>
                        <p className={styles.success}>Success</p>
                    </div>
                </div>
                <div className={[styles.card, styles.loose].join(" ")}>
                    <div className={[styles.infos].join(" ")}>
                        <h4>Data Bundle</h4>
                        <p>22:44, Nov 12, 2020</p>
                    </div>
                    <h2>₦500</h2>
                    <div className={[styles.infos].join(" ")}>
                        <p>Topped Up: 07016412041</p>
                        <p className={styles.success}>Success</p>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default index;
