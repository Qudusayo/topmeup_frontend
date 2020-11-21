import React, { Component } from "react";
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
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        return (
            <Wrapper>
                <form className={styles.Form}>
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
