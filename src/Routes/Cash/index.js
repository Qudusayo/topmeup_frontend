import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

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

    render() {
        return (
            <Wrapper>
                <form className={styles.Form}>
                    <h1>CONVERT AIRTIME</h1>
                    <h3>TO CASH</h3>
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
                        <option value="9mobile">
                            9MOBLIE
                        </option>
                        <option value="airtel">
                            AIRTEL
                        </option>
                        <option value="globacom">
                            GLOBACOM
                        </option>
                        <option value="mtn">
                            MTN
                        </option>
                    </select>
                    <input
                        onChange={this.onChange}
                        type="number"
                        name="amount"
                        id="amount"
                        autoComplete="off"
                        placeholder="Amount"
                        value={this.state.amount}
                        disabled={this.state.waiting}
                        required={true}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "PLACE A SALE"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
