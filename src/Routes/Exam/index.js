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
                    <h1>EXAMINATION PIN</h1>
                    <h3>COMING  SOON!!</h3>
                    <select
                        name="networkProvider"
                        id="networkProvider"
                        className={styles.networkProvider}
                        required
                    >
                        <option value="" hidden>
                            Examination Type
                        </option>
                        <option value="WAEC">
                            WAEC (Cost ₦1750)
                        </option>
                        <option value="NECO">
                            NECO (Cost ₦700)
                        </option>
                    </select>
                    <input
                        onChange={this.onChange}
                        type="number"
                        name="quantity"
                        id="quantity"
                        autoComplete="off"
                        placeholder="Quantity"
                        value={this.state.quantity}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    {/* <button type="submit" disabled={true}>
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "COMING SOON"
                        )}
                    </button> */}
                </form>
            </Wrapper>
        );
    }
}

export default index;
