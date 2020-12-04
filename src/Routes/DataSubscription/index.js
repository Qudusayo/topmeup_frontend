import React, { Component } from "react";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import axios from "axios";

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
            dataSubscription: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state.dataSubscription[this.state.networkProvider]);
    };

    onSubmit = (e) => {
        this.setState({ waiting: true });
        e.preventDefault();
        const data = {
            networkProvider: this.state.networkProvider,
            dataPlan: this.state.dataPlan,
            reciever: this.state.reciever,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/data`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;

        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (!res.data.error) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Data Subscription successful",
                    });
                    this.setState({
                        networkProvider: "",
                        dataPlan: "",
                        reciever: "",
                        waiting: false,
                    });
                } else {
                    swalt(
                        "Data Subscription Failed",
                        `${res.data.errorMsg}`,
                        "warning"
                    );
                    this.setState({ waiting: false });
                }
            })
            .catch((err) => {
                swalt(
                    "Data Subscription Failed",
                    "Error  completing the transaction",
                    "error"
                );
                this.setState({ waiting: false });
            });
    };

    componentDidMount() {
        if (!sessionStorage.getItem("topuplab"))
            return this.props.history.push("/login");
        const api = `${process.env.REACT_APP_BACKEND_URI}/getInfo/dataSubscriptions`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) =>
                this.setState({ dataSubscription: response.data })
            );
    }

    render() {
        return (
            <Wrapper>
                <form className={styles.Form} onSubmit={this.onSubmit}>
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
