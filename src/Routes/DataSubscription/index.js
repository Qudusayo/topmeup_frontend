import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

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
                    <h1>DATA BUNDLE</h1>
                    <h3>PURCHASE DATA</h3>
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
                        <option value="1995">
                            9MOBLIE
                        </option>
                    </select>
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
