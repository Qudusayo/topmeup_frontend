import React, { Component } from "react";
import Wrapper from "./../../Components/Container";
import axios from "axios";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            networkProvider: "",
            dataPlan: "",
            reciever: "",
            waiting: false,
            dataSubscription: {},
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state.dataSubscription[this.state.networkProvider]);
    };

    componentDidMount() {
        axios.get("http://localhost:8900/networkProviders").then((res) => {
            this.setState({ dataSubscription: res.data });
            console.log(res.data);
        });
    }

    render() {
        return (
            <Wrapper>
                <form className={styles.Form}>
                    <h1>DATA BUNDLE</h1>
                    <h3>PURCHASE DATA</h3>
                    <label>Network Provider</label>
                    <select
                        name="networkProvider"
                        id="networkProvider"
                        onChange={this.onChange}
                        value={this.state.networkProvider}
                        className={styles.networkProvider}
                        required
                    >
                        <option value="" hidden>
                            Network Provider
                        </option>
                        <option value="nmobile">9MOBLIE</option>
                        <option value="airtel">AIRTEL</option>
                        <option value="glo">GLOBACOM</option>
                        <option value="mtn">MTN</option>
                    </select>
                    <label>Data Plan</label>
                    <select
                        name="dataPlan"
                        id="dataPlan"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        value={this.state.dataPlan}
                        required
                    >
                        <option value="" hidden>
                            Data Plan
                        </option>
                        {this.state.dataSubscription[this.state.networkProvider]
                            ? this.state.dataSubscription[
                                  this.state.networkProvider
                              ].map((network, index) => {
                                  return (
                                      <option value={network.price} key={index}>
                                          {network.name} --- ₦{network.price}
                                      </option>
                                  );
                              })
                            : null}
                    </select>
                    <label>Recievers Number</label>
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
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "PURCHASE DATA"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
