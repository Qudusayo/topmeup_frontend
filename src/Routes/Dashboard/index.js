import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Wrapper from "./../../Components/Container";

import styles from "./style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
        };
    }

    componentDidMount() {
        const api = `http://localhost:5000/getUserInfo/balance`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                this.setState({ balance: res.data.balance });
            });
    }
    render() {
        return (
            <Wrapper>
                <div className={styles.card}>
                    <Link to="/fund-wallet">
                        <button>+</button>
                    </Link>
                    <div>
                        <h2>Balance</h2>
                        <h1>₦ {this.state.balance}</h1>
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
