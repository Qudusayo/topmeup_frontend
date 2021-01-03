import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Wrapper from "./../../Components/Container";
import axios from "axios";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTransactionHistory } from "./../../actions/usersAction";
import Spinner from "./../../Components/Spinner";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discoName: "",
            meterType: "",
            meterNumber: "",
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
            discoName: this.state.discoName,
            meterType: this.state.meterType,
            meterNumber: this.state.meterNumber,
            amount: this.state.amount,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/electricity`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;

        if (
            !["ibedc", "ekedc", "phed", "ikedc", "jed", "kedco"].includes(
                data.discoName.toLowerCase()
            )
        ) {
            return swalt("Bill Payment Failed", "Invalid disco name", "error");
        } else if (
            !["prepaid", "postpaid"].includes(data.meterType.toLowerCase())
        ) {
            return swalt("Bill Payment Failed", "Invalid meter type", "error");
        } else if (data.amount < 1000) {
            return swalt(
                "Bill Payment Failed",
                "Amount Should be greater or equal to 1000",
                "error"
            );
        }

        Swal.fire({
            title: "Verify Purchase",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Amount:-- <b>₦${
                data.amount
            }</b></p><p style="display:flex;">Disco Name:-- <b>${data.discoName.toUpperCase()}</b></p> <p style="display:flex;">Metre Type:-- <b>${data.meterType.toUpperCase()}</b></p><p style="display:flex;">Metre Number:-- <b>${
                data.meterNumber
            }</b></p></div`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Purchase Power",
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
                                title: "Power Payment successful",
                            });
                            this.setState({
                                discoName: "",
                                meterType: "",
                                meterNumber: "",
                                amount: "",
                                waiting: false,
                            });
                            this.props.getTransactionHistory();
                            this.props.history.push("/dashboard");
                        } else {
                            swalt(
                                "Power Payment Failed",
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
                            "Power Payment Failed",
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

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | BILL PAYMENT </title>
                </Helmet>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>BUY POWER</h1>
                    <h3>ELECTRICITY PAYMENT</h3>
                    <label>Disco Name</label>
                    <select
                        name="discoName"
                        id="discoName"
                        value={this.state.discoName}
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        required
                    >
                        <option value="" hidden>
                            Disco Name
                        </option>
                        <option value="IBEDC">Ibadan Electric - IBEDC</option>
                        <option value="EKEDC">Eko Electric - EKEDC</option>
                        <option value="PHED">
                            PortHarcourt Electric - PHED
                        </option>
                        <option value="IKEDC">Ikeja Electric - IKEDC</option>
                        <option value="JED">Jos Electric - JED</option>
                        <option value="KEDCO">Kano Electric - KEDCO</option>
                    </select>
                    <label>Meter Type</label>
                    <select
                        name="meterType"
                        id="meterType"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        value={this.state.meterType}
                        required
                    >
                        <option value="" hidden>
                            Meter Type
                        </option>
                        <option value="prepaid">PREPAID</option>
                        <option value="postpaid">POSTPAID</option>
                    </select>
                    <label>Meter Number</label>
                    <input
                        onChange={this.onChange}
                        type="tel"
                        name="meterNumber"
                        id="meterNumber"
                        autoComplete="off"
                        placeholder="Meter Number"
                        value={this.state.meterNumber}
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
                        min="1000"
                        max="50000"
                        value={this.state.amount}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <div className={styles.units}>
                        <span onClick={() => this.autoFill("1000")}>1000</span>
                        <span onClick={() => this.autoFill("2000")}>2000</span>
                        <span onClick={() => this.autoFill("5000")}>5000</span>
                        <span onClick={() => this.autoFill("10000")}>
                            10000
                        </span>
                    </div>
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? <Spinner /> : "PURCHASE POWER"}
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
