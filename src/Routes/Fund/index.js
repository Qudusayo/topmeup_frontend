import React, { Component } from "react";
import swal from "@sweetalert/with-react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Wrapper from "./../../Components/Container";

import { getTransactionHistory } from "./../../actions/usersAction";
import spinner from "./../../assets/images/logos/loading.png";

import Online from "./Online";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: "",
            depositorsName: "",
            depositorsEmail: "",
            amount: "",
            onlineAmount: "",
            onlinePayment: false,
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.makeOnlinePayment = this.makeOnlinePayment.bind(this);
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
                    this.props.getTransactionHistory();
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

    componentDidMount() {
        this.setState({ depositorsEmail: this.props.userInfo.email });
    }

    makeOnlinePayment(e) {
        e.preventDefault();

        if (this.state.depositorsEmail !== this.props.userInfo.email) {
            return swal("Transaction Failed", "Invalid email address", "error");
        } else if (this.state.onlineAmount < 500 || !this.state.onlineAmount) {
            return swal(
                "Data Purchase Failed",
                "Invalid Phone Number",
                "error"
            );
        }

        if (!this.state.onlinePayment) {
            Swal.fire({
                title: "Verify Payment",
                text: "You won't be able to revert this!",
                html: `<div><p style="display:flex;">Amount:-- <b>₦${this.state.onlineAmount}</b></p><p style="display:flex;">Email:-- <b>${this.state.depositorsEmail}</b></p></div>`,
                icon: "question",
                backdrop: "#00000090",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continue",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.setState({ onlinePayment: true });
                }
            });
        }
    }

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | FUND WALLET</title>
                </Helmet>
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
                            Online Payment (Min ₦500, 1.5% Fee)
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
                                <p>
                                    <b>
                                        Kindly Fill the form below if
                                        transferred
                                    </b>
                                </p>
                                <p>
                                    <b>
                                        Note: AIf you've filled the form nd your
                                        wallet is not credited after 15 minutes,
                                        Kindly contact the{" "}
                                        <a
                                            style={{
                                                textDecoration: "none",
                                                color: "#127EB1",
                                            }}
                                            href="https://wa.me/message/YCC5HDYHVI4HA1"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            ADMIN Here
                                        </a>
                                    </b>
                                </p>
                            </div>
                        </>
                    ) : null}
                    {this.state.payment === "abPayment" ? (
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
                                method. Kindly contact the admin on how to make
                                payment with this. Note that charges may apply
                                with this type of payment. Kindly bear with us.
                                Thanks for using our service
                            </p>
                        </div>
                    ) : null}
                </form>
                {this.state.payment === "onlinePayment" ? (
                    <form
                        className={styles.Form}
                        onSubmit={this.makeOnlinePayment}
                    >
                        <h1>ONLINE PAYMENT</h1>
                        <h3>SUBMIT A REQUEST</h3>
                        <label>Depositors Email</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="depositorsEmail"
                            id="depositorsEmail"
                            autoComplete="off"
                            placeholder="Depositors Email"
                            value={this.state.depositorsEmail}
                            required={true}
                            disabled={true}
                        />
                        <label>Amount</label>
                        <input
                            onChange={this.onChange}
                            type="number"
                            name="onlineAmount"
                            id="onlineAmount"
                            autoComplete="off"
                            placeholder="Amount"
                            value={this.state.onlineAmount}
                            min="500"
                            required={true}
                            disabled={this.state.onlinePayment}
                        />
                        {!this.state.onlinePayment ? (
                            <button type="submit" disabled={this.state.waiting}>
                                {this.state.waiting ? (
                                    <img
                                        className={styles.spinner}
                                        src={spinner}
                                        alt="spinner"
                                    />
                                ) : (
                                    "PROCEED"
                                )}
                            </button>
                        ) : (
                            <Online
                                email={this.state.depositorsEmail}
                                amount={
                                    (parseInt(this.state.onlineAmount) +
                                        (1.5 / 100) *
                                            parseInt(this.state.onlineAmount)) *
                                    100
                                }
                            />
                        )}
                    </form>
                ) : null}
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

Index.propsTypes = {
    userInfo: PropTypes.object.isRequired,
    getTransactionHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.user.auth,
    userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, { getTransactionHistory })(Index);
