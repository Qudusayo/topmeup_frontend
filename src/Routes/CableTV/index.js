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
            tvPlan: "",
            cardNumber: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();

        const data = {
            networkProvider: this.state.networkProvider,
            tvPlan: this.state.tvPlan,
            cardNumber: this.state.cardNumber,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/cableTV`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;

        if (
            !["gotv", "dstv", "startimes"].includes(
                data.networkProvider.toLowerCase()
            )
        ) {
            return swalt("TV Payment Failed", "Invalid disco name", "error");
        } else if (!data.cardNumber) {
            return swalt(
                "Bill Payment Failed",
                "Card number required",
                "error"
            );
        } else if (!data.tvPlan) {
            return swalt("TV Payment Failed", "Kindly select a plan", "error");
        }

        Swal.fire({
            title: "Verify Purchase",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Amount:-- <b>₦${
                data.tvPlan
            }</b></p><p style="display:flex;">Disco Name:-- <b>${data.networkProvider.toUpperCase()}</b></p> <p style="display:flex;">Card Number:-- <b>${
                data.cardNumber
            }</b></p></div>`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Purchase TV",
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
                                title: "TV Payment successful",
                            });
                            this.setState({
                                networkProvider: "",
                                tvPlan: "",
                                cardNumber: "",
                                waiting: false,
                            });
                            this.props.getTransactionHistory();
                        } else {
                            swalt(
                                "TV Payment Failed",
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
                            "TV Payment Failed",
                            "Error  completing the transaction",
                            "error"
                        );
                        this.setState({ waiting: false });
                    });
            }
        });
    }

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | TV PLAN PURCHASE </title>
                </Helmet>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>TV SUBSCRIPTION</h1>
                    <h3>PURCHASE DATA</h3>
                    <label>Cable Name</label>
                    <select
                        name="networkProvider"
                        id="networkProvider"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        required
                    >
                        <option value="" hidden>
                            Cable Name
                        </option>
                        <option value="dstv">DSTV</option>
                        <option value="gotv">GOTV</option>
                        <option value="startimes">STARTIMES</option>
                    </select>
                    <label>TV Plan</label>
                    <select
                        name="tvPlan"
                        id="tvPlan"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        required
                    >
                        <option value="" hidden>
                            TV Plan
                        </option>
                        {this.props.tvSubscription[this.state.networkProvider]
                            ? this.props.tvSubscription[
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
                    <label>Card Number</label>
                    <input
                        onChange={this.onChange}
                        type="tel"
                        name="cardNumber"
                        id="cardNumber"
                        autoComplete="off"
                        placeholder="Smart Card number / IUC number*"
                        value={this.state.cardNumber}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? <Spinner /> : "VALIDATE"}
                    </button>
                </form>
                <div className={styles.card}>
                    <b>
                        You can contact DSTV/GOtv's customers care unit on
                        01-2703232/08039003788 or the toll free lines:
                        08149860333, 07080630333, and 09090630333 for
                        assistance, STARTIMES's customers care unit on
                        (094618888, 014618888)
                    </b>
                </div>
            </Wrapper>
        );
    }
}

Index.propsTypes = {
    getTransactionHistory: PropTypes.func.isRequired,
    tvSubscription: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tvSubscription: state.user.tvSubscription,
});

export default connect(mapStateToProps, { getTransactionHistory })(Index);
