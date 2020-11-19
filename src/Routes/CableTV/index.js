import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            networkProvider: "",
            tvPlan: "",
            cardNumber: "",
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
                    <h1>TV SUBSCRIPTION</h1>
                    <h3>PURCHASE DATA</h3>
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
                        <option value="1995">DSTV</option>
                        <option value="1995">GOTV</option>
                        <option value="1995">STARTIMES</option>
                    </select>
                    <select
                        name="tvPlan"
                        id="tvPlan"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        required
                    >
                        <option value="" hidden>
                            Cable TV Plan
                        </option>
                        <option value="1995">9MOBLIE</option>
                    </select>
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
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "VALIDATE"
                        )}
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

export default index;
