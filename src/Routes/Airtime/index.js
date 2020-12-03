import React, { Component } from "react";
import axios from "axios";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            networkProvider: "",
            reciever: "",
            amount: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        this.setState({ waiting: true });
        e.preventDefault();
        const data = {
            amount: this.state.amount,
            networkProvider: this.state.networkProvider,
            reciever: this.state.reciever,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/airtime`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (!res.data.error) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Airtime purchased successfully",
                    });
                    this.setState({
                        amount: "",
                        networkProvider: "",
                        reciever: "",
                    });
                    this.props.history.push("/dashboard");
                } else {
                    swalt(
                        "Airtime Purchase Failed",
                        `${res.data.errorMsg}`,
                        "warning"
                    );
                    this.setState({ waiting: false });
                }
            })
            .catch((err) => {
                swalt(
                    "Airtime Purchase Failed",
                    "Error  completing the transaction",
                    "error"
                );
                this.setState({ waiting: false });
            });
    };

    render() {
        return (
            <Wrapper>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>QUICK TOPUP</h1>
                    <h3>PURCHASE AIRTIME</h3>
                    <label>Network Provider</label>
                    <select
                        name="networkProvider"
                        id="networkProvider"
                        className={styles.networkProvider}
                        value={this.state.networkProvider}
                        onChange={this.onChange}
                        required
                    >
                        <option value="" hidden>
                            Network Provider
                        </option>
                        <option value="9mobile">9MOBLIE</option>
                        <option value="airtel">AIRTEL</option>
                        <option value="globacom">GLOBACOM</option>
                        <option value="mtn">MTN</option>
                    </select>
                    <label>Phone Number</label>
                    <input
                        onChange={this.onChange}
                        type="tel"
                        name="reciever"
                        id="reciever"
                        autoComplete="off"
                        placeholder="Phone Number"
                        minLength="11"
                        maxLength="11"
                        value={this.state.reciever}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <label>Amount</label>
                    <input
                        onChange={this.onChange}
                        type="number"
                        name="amount"
                        id="amount"
                        autoComplete="off"
                        placeholder="Amount"
                        value={this.state.amount}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "PURCHASE AIRTIME"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
