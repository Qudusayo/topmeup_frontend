import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./style.module.scss";

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
    onChange (){
        
    }
    render() {
        return (
            <Wrapper>
                <div className={styles.card}>
                    <h4>Hello</h4>
                    <p>
                        Transfer Money From Wallet To Wallet Is A Secure Way To
                        Move Money Around For Business And Daily Uses. As You
                        Can Now Transfer Money From One Wallet Account To
                        Another Wallet Account In Just Some Few Clicks.
                    </p>
                </div>
                <form>
                    <h3>Transfer Fund</h3>
                    <input
                        type="text"
                        name="balance"
                        id="balance"
                        autoComplete="off"
                        value={this.state.balance}
                        required={true}
                        disabled={true}
                    />
                    <input
                        onChange={this.onChange}
                        type="text"
                        name="reciever"
                        id="reciever"
                        autoComplete="off"
                        placeholder="Reciever's Username"
                        value={this.state.reciever}
                        required={true}
                        disabled={this.state.waiting}
                    />
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
                            "SEND MONEY"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
