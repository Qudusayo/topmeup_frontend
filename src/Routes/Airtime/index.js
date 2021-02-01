import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTransactionHistory } from "./../../actions/usersAction";
import Wrapper from "./../../Components/Container";

import Spinner from "./../../Components/Spinner";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
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
        e.preventDefault();
        const data = {
            amount: this.state.amount,
            networkProvider: this.state.networkProvider,
            reciever: this.state.reciever,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/airtime`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        const phoneNumberValidator = /^[0-9]{11}$/;

        if (
            !["mtn", "nmobile", "globacom", "airtel"].includes(
                data.networkProvider
            )
        ) {
            return swalt(
                "Airtime Purchase Failed",
                "Invalid transaction details",
                "error"
            );
        } else if (
            !phoneNumberValidator.test(data.reciever) ||
            data.reciever.length !== 11
        ) {
            return this.error("Invalid Mobile Number");
        } else if (data.amount < 50) {
            return swalt(
                "Airtime Purchase Failed",
                "Amount less than ₦50",
                "error"
            );
        } else if (
            data.reciever.length < 11 ||
            data.reciever.length > 11 ||
            data.reciever[0] !== "0"
        ) {
            return swalt(
                "Airtime Purchase Failed",
                "Invalid Phone Number",
                "error"
            );
        }

        Swal.fire({
            title: "Verify Purchase",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Amount:-- <b>₦${
                this.state.amount
            }</b></p><p style="display:flex;">Network Provider:-- <b>${this.state.networkProvider.toUpperCase()}</b></p> <p style="display:flex;">Number:-- <b>${
                this.state.reciever
            }</b></p></div>`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Purchase Airtime",
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
                            this.props.getTransactionHistory();
                            this.props.history.push("/dashboard");
                        } else {
                            swalt(
                                "Airtime Purchase Failed",
                                res.data.errorMsg
                                    ? `${res.data.errorMsg}`
                                    : "Error Completing Transaction",
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
            }
        });
    };

    autoFill = (value) => {
        this.setState({ amount: value });
    };

    // componentDidMount(){
    //     Swal.fire({
    //         title: "Great News",
    //         text: "You won't be able to revert this!",
    //         html: `<div><ul>
    //             <li>You can now get <b> MTN airtime at 3% off </b> </li>
    //             <li>You can now get <b> GLO airtime at 5% off </b></li>
    //             <li><b>Airtel network is not available apparently</b></li>
    //             <li>We're working greatly on others too</li>
    //             <li>Thanks for using our service.</li>
    //         </ul></div>`,
    //         backdrop: "#00000090",
    //         showCancelButton: false,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Okay",
    //     })
    // }

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | AIRTIME PURCHASE </title>
                </Helmet>
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
                        <option value="nmobile">9MOBLIE</option>
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
                        pattern="^0[7-9]{1}[01]{1}[0-9]{8}"
                        value={this.state.reciever}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <label>Amount</label>
                    <span className={styles.inputHeavySymbolNaira}>
                        <input
                            onChange={this.onChange}
                            type="number"
                            name="amount"
                            id="amount"
                            autoComplete="off"
                            min="50"
                            max="50000"
                            placeholder="Amount"
                            value={this.state.amount}
                            required={true}
                            disabled={this.state.waiting}
                        />
                    </span>
                    <div className={styles.units}>
                        <span onClick={() => this.autoFill("100")}>100</span>
                        <span onClick={() => this.autoFill("200")}>200</span>
                        <span onClick={() => this.autoFill("500")}>500</span>
                        <span onClick={() => this.autoFill("1000")}>1000</span>
                    </div>
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? <Spinner /> : "PURCHASE AIRTIME"}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

Index.propsTypes = {
    getTransactionHistory: PropTypes.func.isRequired,
};

export default connect("", { getTransactionHistory })(Index);
