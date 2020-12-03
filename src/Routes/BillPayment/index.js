import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discoName: "",
            meterType: "",
            meterNumber: "",
            amount: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        this.setState({ waiting: true });
        e.preventDefault();
        const data = {
            discoName: this.state.discoName,
            meterType: this.state.meterType,
            meterNumber: this.state.meterNumber,
            amount: this.state.amount,
        };
        console.log(data);
        this.setState({
            discoName: "",
            meterType: "",
            meterNumber: "",
            amount: "",
            waiting: false,
        });
    };

    render() {
        return (
            <Wrapper>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>BUY POWER</h1>
                    <h3>ELECTRICITY PAYMENT</h3>
                    <label>Disco Name</label>
                    <select
                        name="discoName"
                        id="discoName"
                        value={this.state.discoName}
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        required
                    >
                        <option value="" hidden>
                            Disco Name
                        </option>
                        <option value="IBEDC">Ibadan Electric - IBEDC</option>
                        <option value="EKEDC">Eko Electric - EKEDC</option>
                        <option value="PHED">
                            PortHarcourt Electric - PHED
                        </option>
                        <option value="IKEDC">Ikeja Electric - IKEDC</option>
                        <option value="JED">Jos Electric - JED</option>
                        <option value="KEDCO">Kano Electric - KEDCO</option>
                    </select>
                    <label>Meter Type</label>
                    <select
                        name="meterType"
                        id="meterType"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        value={this.state.meterType}
                        required
                    >
                        <option value="" hidden>
                            Meter Type
                        </option>
                        <option value="prepaid">PREPAID</option>
                        <option value="postpaid">POSTPAID</option>
                    </select>
                    <label>Meter Number</label>
                    <input
                        onChange={this.onChange}
                        type="tel"
                        name="meterNumber"
                        id="meterNumber"
                        autoComplete="off"
                        placeholder="Meter Number"
                        value={this.state.meterNumber}
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
                        min="1000"
                        max="50000"
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
                            "PURCHASE POWER"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
