import React, { Component } from "react";
import {Helmet} from "react-helmet";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bankName: "",
            accountName: "",
            accountNumber: "",
            amount: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        return (
            <Wrapper>
            <Helmet>
                <title>TOP UP LAB | WITHDRAW FUND</title>
            </Helmet>
                <form className={styles.Form}>
                    <h1>WITHDRAW FUND</h1>
                    <h3>WITH ₦ 100 CHARGES</h3>
                    <label>Bank Name</label>
                    <select
                        name="bankName"
                        id="bankName"
                        onChange={this.onChange}
                        value={this.state.bankName}
                        className={styles.networkProvider}
                        required
                    >
                        <option value="" hidden>
                            Bank Name
                        </option>
                        <option value="First Bank of Nigeria">
                            First Bank of Nigeria
                        </option>
                        <option value="UBA">UBA</option>
                        <option value="Access Bank">Access Bank</option>
                        <option value="Wema Bank">Wema Bank</option>
                        <option value="Diamond Bank">Diamond Bank</option>
                        <option value="Heritage Bank">Heritage Bank</option>
                        <option value="Skye Bank">Skye Bank</option>
                        <option value="Stanbic IBTC">Stanbic IBTC</option>
                        <option value="Sterling Bank">Sterling Bank</option>
                        <option value="Union Bank">Union Bank</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="Unity Bank">Unity Bank</option>
                        <option value="FCMBank">FCMBank</option>
                        <option value="GTBank">GTBank</option>
                        <option value="FIdelity Bank">FIdelity Bank</option>
                        <option value="ECO Bank">ECO Bank</option>
                    </select>
                    <label>Account Name</label>
                    <input
                        onChange={this.onChange}
                        type="text"
                        name="accountName"
                        id="accountName"
                        autoComplete="off"
                        placeholder="Account Name"
                        value={this.state.accountName}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <label>Account Number</label>
                    <input
                        onChange={this.onChange}
                        type="tel"
                        name="accountNumber"
                        id="accountNumber"
                        autoComplete="off"
                        placeholder="Account Number"
                        value={this.state.accountNumber}
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
                    <button type="submit" disabled={true}>
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
                </form>
            </Wrapper>
        );
    }
}

export default index;
