import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: "45,000",
            reciever: "",
            amount: "",
            waiting: false,
        };
    }
    onChange() {}
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
                        required
                    >
                        <option value="" hidden>
                            Network Provider
                        </option>
                        <option value="1995">
                            9MOBLIE
                        </option>
                        <option value="1995">
                            AIRTEL
                        </option>
                        <option value="1995">
                            GLOBACOM
                        </option>
                        <option value="1996">
                            MTN
                        </option>
                    </select>
                    <input
                        onChange={this.onChange}
                        type="number"
                        name="firstName"
                        id="firstName"
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
                            "PLACE A SALE"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
