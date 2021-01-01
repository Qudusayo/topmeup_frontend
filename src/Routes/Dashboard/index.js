import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Wrapper from "./../../Components/Container";

import styles from "./style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            today: "",
            refUrl: "http://topuplab.com.ng/register?ref=",
        };
    }

    componentDidMount() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + "/" + dd + "/" + yyyy;

        if (!sessionStorage.getItem("topuplab"))
            return this.props.history.push("/login");
        const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo/balance`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const refUrl =
                    this.state.refUrl +
                    res.data.userName[0].toUpperCase() +
                    res.data.userName.slice(1);
                this.setState({ balance: res.data.balance, today, refUrl });
            });
    }

    copyUrl = () => {
        navigator.clipboard.writeText(this.state.refUrl);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "success",
            title: "Link Copied Successfully",
        });
    };

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | DASHBOARD </title>
                </Helmet>
                <div className={styles.card}>
                    <Link to="/fund-wallet">
                        <button className={styles.fund}>+</button>
                    </Link>
                    <div>
                        <h2>Balance</h2>
                        <h1>₦ {this.state.balance}</h1>
                        <p>
                            As at{" "}
                            {this.state.today ? this.state.today : "11/11/2020"}{" "}
                        </p>
                    </div>
                </div>
                <div className={[styles.card, styles.refLink].join(" ")}>
                    <input value={this.state.refUrl} disabled />
                    <button onClick={this.copyUrl}>COPY</button>
                </div>
                <div className={styles.cards}>
                    <Link to="/data-subscription">
                        <div>DATA BUNDLE</div>
                    </Link>
                    <Link to="/airtime-topup">
                        <div>AIRTIME TOPUP</div>
                    </Link>
                    <Link to="/bill-payment">
                        <div>UTILITY BILLS</div>
                    </Link>
                </div>
                <div className={styles.cards}>
                    <Link to="/cable-TV">
                        <div>TV SUBSCRIPTION</div>
                    </Link>
                    <Link to="/buy-scratch-card">
                        <div>SCRATCH CARD</div>
                    </Link>
                    <Link to="/transfer-fund">
                        <div>TRANSFER MONEY</div>
                    </Link>
                </div>
            </Wrapper>
        );
    }
}

export default index;
