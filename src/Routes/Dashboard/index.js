import React, { Component } from "react";
import {Helmet} from "react-helmet";
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
        if(!sessionStorage.getItem("topuplab")) return this.props.history.push('/login')
        const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo/balance`;
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
            <Helmet>
                <title>TOP UP LAB | DASHBOARD </title>
            </Helmet>
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
                    <Link to="/data-subscription"><div>DATA BUNDLE</div></Link>
                    <Link to="/airtime-topup"><div>AIRTIME TOPUP</div></Link>
                    <Link to="/bill-payment"><div>UTILITY BILLS</div></Link>
                </div>
                <div className={styles.cards}>
                    <Link to="/cable-TV"><div>TV SUBSCRIPTION</div></Link>
                    <Link to="/buy-scratch-card"><div>SCRATCH CARD</div></Link>
                    <Link to="/transfer-fund"><div>TRANSFER MONEY</div></Link>
                </div>
            </Wrapper>
        );
    }
}

export default index;
