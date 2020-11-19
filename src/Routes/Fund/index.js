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
                        Payment can be done by using any of the options below:{" "}
                    </h3>
                    <select
                        name="networkProvider"
                        id="networkProvider"
                        className={styles.networkProvider}
                        required
                    >
                        <option value="" hidden>
                            Select Payment Method
                        </option>
                        <option value="1996">
                            Bank Payment (Min ₦1000, 0% Fee)
                        </option>
                        <option value="1995">
                            Online Payment (Min ₦100, 1.5% Fee)
                        </option>
                        <option value="1995">
                            Airtime Payment (Min ₦120, 20% Fee)
                        </option>
                        <option value="1995">
                            Auto Bank Payment (Min ₦100, 0.75% Fee)
                        </option>
                    </select>
                </form>
            </Wrapper>
        );
    }
}

export default index;
