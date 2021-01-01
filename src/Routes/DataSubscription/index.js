import React, { Component } from "react";
import { Helmet } from "react-helmet";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import axios from "axios";
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
            dataPlan: "",
            reciever: "",
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
            networkProvider: this.state.networkProvider,
            dataPlan: this.state.dataPlan,
            reciever: this.state.reciever,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/data`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;

        if (
            !["mtn", "nmobile", "globacom", "airtel"].includes(
                data.networkProvider
            )
        ) {
            return swalt(
                "Data Purchase Failed",
                "Invalid transaction details",
                "error"
            );
        } else if (
            data.reciever.length < 11 ||
            data.reciever.length > 11 ||
            data.reciever[0] !== "0"
        ) {
            return swalt(
                "Data Purchase Failed",
                "Invalid Phone Number",
                "error"
            );
        }

        Swal.fire({
            title: "Verify Purchase",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Amount:-- <b>₦${
                this.state.dataPlan
            }</b></p><p style="display:flex;">Network Provider:-- <b>${this.state.networkProvider.toUpperCase()}</b></p> <p style="display:flex;">Number:-- <b>${
                this.state.reciever
            }</b></p></div>`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Purchase Data Plan",
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
                                title: "Data Subscription successful",
                            });
                            this.setState({
                                networkProvider: "",
                                dataPlan: "",
                                reciever: "",
                                waiting: false,
                            });
                            this.props.getTransactionHistory();
                        } else {
                            swalt(
                                "Data Subscription Failed",
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
                            "Data Subscription Failed",
                            "Error  completing the transaction",
                            "error"
                        );
                        this.setState({ waiting: false });
                    });
            }
        });
    };

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | PURCHASE DATA </title>
                </Helmet>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>DATA BUNDLE</h1>
                    <h3>PURCHASE DATA</h3>
                    <label>Network Provider</label>
                    <select
                        name="networkProvider"
                        id="networkProvider"
                        onChange={this.onChange}
                        value={this.state.networkProvider}
                        className={styles.networkProvider}
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
                    <label>Data Plan</label>
                    <select
                        name="dataPlan"
                        id="dataPlan"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        value={this.state.dataPlan}
                        required
                    >
                        <option value="" hidden>
                            Data Plan
                        </option>
                        {this.props.dataSubscription[this.state.networkProvider]
                            ? this.props.dataSubscription[
                                  this.state.networkProvider
                              ].map((network, index) => {
                                  return (
                                      <option value={network.price} key={index}>
                                          {network.name} --- ₦{network.price}
                                      </option>
                                  );
                              })
                            : null}
                    </select>
                    <label>Recievers Number</label>
                    <input
                        onChange={this.onChange}
                        type="tel"
                        name="reciever"
                        id="reciever"
                        autoComplete="off"
                        placeholder="Phone Number"
                        value={this.state.reciever}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? <Spinner /> : "PURCHASE DATA"}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

Index.propsTypes = {
    getTransactionHistory: PropTypes.func.isRequired,
    dataSubscription: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    dataSubscription: state.user.dataSubscription,
});

export default connect(mapStateToProps, { getTransactionHistory })(Index);
