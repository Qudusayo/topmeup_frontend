import React, { Component } from "react";
import axios from "axios";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: "0",
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

    componentDidMount() {
        if (!sessionStorage.getItem("topuplab"))
            return this.props.history.push("/login");
        const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo/balance`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                this.setState({ balance: res.data.balance });
            });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            amount: this.state.amount,
            reciever: this.state.reciever,
            type: "Transfer Fund",
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/sendMoney`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;

        if (!data.amount || !data.reciever) {
            return swalt(
                "Transfer Failed",
                "Invalid transfer details",
                "error"
            );
        } else if (data.amount < 50) {
            return swalt("Transfer Failed", "Amount less than ₦50", "error");
        }

        Swal.fire({
            title: "Verify Transfer",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Amount:-- <b>₦${this.state.amount}</b></p><p style="display:flex;">Reciever:-- <b>${this.state.reciever}</b></p></div>`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Transfer",
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({ waiting: true });
                axios
                    .post(api, data, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (!res.data.error) {
                            Swal.fire({
                                title: "Transaction Completed",
                                text: "Money transferred successfully!",
                                icon: "success",
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                            this.setState({
                                amount: "",
                                reciever: "",
                            });
                            this.props.history.push("/dashboard");
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Transaction Failed",
                                text: `${res.data.message}`,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                            this.setState({ waiting: false });
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
                        this.setState({ waiting: false });
                    });
            }
        });
    };

    render() {
        return (
            <Wrapper>
                <div className={styles.card}>
                    <h4>Hello</h4>
                    <p>
                        Transfer Money From Wallet To Wallet Is A Secure Way To
                        Move Money Around For Business And Daily Uses. As You
                        Can Now Transfer Money From One Wallet Account To
                        Another Wallet Account In Just Some Few Clicks.
                    </p>
                </div>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h3>Transfer Fund</h3>
                    <input
                        type="text"
                        name="balance"
                        id="balance"
                        autoComplete="off"
                        value={this.state.balance}
                        required={true}
                        disabled={true}
                    />
                    <input
                        onChange={this.onChange}
                        type="text"
                        name="reciever"
                        id="reciever"
                        autoComplete="off"
                        placeholder="Reciever's Username"
                        value={this.state.reciever}
                        required={true}
                        disabled={this.state.waiting}
                    />
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
                            "SEND MONEY"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
