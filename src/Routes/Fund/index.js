import React, { Component } from "react";
import swal from "@sweetalert/with-react";
import axios from "axios";

import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: "",
            depositorsName: "",
            amount: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value, tranferred: false });
    };

    onSubmit = (e) => {
        this.setState({ waiting: true });
        e.preventDefault();
        const data = {
            depositorsName: this.state.depositorsName,
            amount: this.state.amount,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/sendInfo/payment`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (!res.data.error) {
                    swal(
                        "Request Sent",
                        "Payment will be updated shortly",
                        "success"
                    );
                    this.setState({
                        depositorsName: "",
                        amount: "",
                        waiting: false,
                    });
                    this.props.history.push("/dashboard");
                } else {
                    swal(
                        "Error Sending Info",
                        "Kindly try again or chat us on Whatsapp",
                        "warning"
                    );
                    this.setState({ waiting: false });
                }
            })
            .catch((err) => {
                swal(
                    "Error Sending Info",
                    "Kindly try again or chat us on Whatsapp",
                    "warning"
                );
                this.setState({ waiting: false });
            });
    };

    render() {
        return (
            <Wrapper>
                <div className={styles.card}>
                    <h4>Hello</h4>
                    <p>
                        Before you can make any transaction on our platform, you
                        must have enough balance. Kindly fund your wallet with
                        as low as ₦100 through Online Payment or Auto Bank
                        Payment and a minimum of ₦1000 through Bank Transfer
                        Payment and start enjoying the Cheapest plan with
                        TopUpLabs.
                        <br />
                        Thanks for Choosing Us
                    </p>
                </div>
                <form className={styles.Form}>
                    <h1>MAKE PAYMENT</h1>
                    <h3>
                        Payment can be done by using any of the options below:
                    </h3>
                    <label>Payment Method</label>
                    <select
                        name="payment"
                        id="payment"
                        onChange={this.onChange}
                        value={this.state.payment}
                        className={styles.networkProvider}
                        required
                    >
                        <option value="" hidden>
                            Select Payment Method
                        </option>
                        <option value="bankPayment">
                            Bank Payment (Min ₦1000, 0% Fee)
                        </option>
                        <option value="onlinePayment">
                            Online Payment (Min ₦100, 1.5% Fee)
                        </option>
                        <option value="airtimePayment">
                            Airtime Payment (Min ₦120, 20% Fee)
                        </option>
                        <option value="abPayment">
                            Auto Bank Payment (Min ₦100, 0.75% Fee)
                        </option>
                    </select>
                    <br />
                    {this.state.payment === "bankPayment" ? (
                        <>
                            <div className={styles.bankInfo}>
                                <h4>0501764158</h4>
                                <h4>Sterling Bank</h4>
                                <h4>Abdulqudus Bolaji</h4>
                                <br />
                                <p>
                                    Bank Deposit/Atm Transfer/Online Bank
                                    Transfer/ USSD & others (Instant/Automated)
                                    (Minimum of #1,000): Payments are accepted
                                    into any of our bank accounts stated on this
                                    page.
                                </p>
                            </div>
                            <div className={styles.bankInfo}>
                                <p><b>Kindly Fill the form below if transferred</b></p>
                                <p><b>Note: AIf you've filled the form nd your wallet is not credited after 15 minutes, Kindly contact the <a style={{textDecoration: "none", color: "#127EB1"}} href="https://wa.me/message/YCC5HDYHVI4HA1" target="_blank" rel="noreferrer">ADMIN Here</a></b></p>
                            </div>
                        </>
                    ) : null}
                    {this.state.payment === "abPayment" ||
                    this.state.payment === "onlinePayment" ? (
                        <div className={styles.bankInfo}>
                            <h1>Online Payment</h1>
                            <h3>Payment type not available yet</h3>
                            <p>
                                We're working hard to get you the best payment
                                method. Kindly use the Bank Payment (Bank
                                Transfer) Method as of now. We will inform you
                                when this payment type is active. Kindly bear
                                with us. Thanks for using our service
                            </p>
                        </div>
                    ) : null}
                    {this.state.payment === "airtimePayment" ? (
                        <div className={styles.bankInfo}>
                            <h1>Airtime Payment</h1>
                            <h3>Payment not automated</h3>
                            <p>
                                We're working hard to get you the best payment
                                method. Kindly contact the admin on how to make payment with this. Note that charges may apply with this type of payment. Kindly bear
                                with us. Thanks for using our service
                            </p>
                        </div>
                    ) : null}
                </form>
                {this.state.payment === "bankPayment" ? (
                    <form className={styles.Form} onSubmit={this.onSubmit}>
                        <h1>BANK PAYMENT</h1>
                        <h3>SUBMIT A REQUEST</h3>
                        <label>Depositors Name</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="depositorsName"
                            id="depositorsName"
                            autoComplete="off"
                            placeholder="Depositors Name"
                            value={this.state.depositorsName}
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
                            min="500"
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
                                "SUBMIT"
                            )}
                        </button>
                    </form>
                ) : null}
            </Wrapper>
        );
    }
}

export default index;
