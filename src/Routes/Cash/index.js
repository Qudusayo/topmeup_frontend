import React, { Component } from "react";
import { Helmet } from "react-helmet";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import Wrapper from "./../../Components/Container";

import Spinner from "./../../Components/Spinner";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            networkProvider: "",
            amount: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            networkProvider: this.state.networkProvider,
            amount: this.state.amount,
        };
        if (
            !["mtn", "9mobile", "globacom", "airtel"].includes(
                data.networkProvider
            )
        ) {
            return swalt(
                "Airtime Purchase Failed",
                "Invalid transaction details",
                "error"
            );
        } else if (data.amount < 500) {
            return swalt(
                "Airtime Purchase Failed",
                "Amount less than ₦500",
                "error"
            );
        }

        Swal.fire({
            title: "Verify Purchase",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Cost:-- <b>₦${
                data.amount
            }</b></p><p style="display:flex;">Network Provider:-- <b>${data.networkProvider.toUpperCase()}</b></p></div>`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Send Request",
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({ waiting: true });
                window.open(
                    `https://api.whatsapp.com/send?phone=2347016412041&text=Hi%20Admin%20TopUpLab.%0AI%20want%20to%20make%20a%20sale%20of%20*₦${this.state.amount}%20${this.state.networkProvider}%20airtime*%20.%20Will%20look%20forward%20to%20your%20response%20as%20quick%20as%20%20possible`,
                    "_blank"
                );
                this.setState({ waiting: false });
            }
        });
    };

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | AIRTIME TO CASH </title>
                </Helmet>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>CONVERT AIRTIME</h1>
                    <h3>TO CASH</h3>
                    <label>Network Provider</label>
                    <select
                        name="networkProvider"
                        id="networkProvider"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        value={this.state.networkProvider}
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
                    <label>Amount</label>
                    <input
                        onChange={this.onChange}
                        type="number"
                        name="amount"
                        id="amount"
                        autoComplete="off"
                        placeholder="Amount"
                        min="500"
                        value={this.state.amount}
                        disabled={this.state.waiting}
                        required={true}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? <Spinner /> : "PLACE A SALE"}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
