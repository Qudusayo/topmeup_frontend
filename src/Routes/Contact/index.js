import React, { Component } from "react";
import Cookies from 'js-cookie';
import { Helmet } from "react-helmet";
import axios from "axios";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import Wrapper from "./../../Components/Container";

import Spinner from "./../../Components/Spinner";

import styles from "./style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageType: "",
            message: "",
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
            messageType: this.state.messageType,
            message: this.state.message,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/sendInfo/message`;
        const token = Cookies.get('_lab__topup');
        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
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
                        title: "Message sent successfully",
                    });
                    this.setState({
                        depositorsName: "",
                        amount: "",
                        waiting: false,
                    });
                    this.props.history.push("/dashboard");
                } else {
                    swalt(
                        "Error Sending Info",
                        "Kindly try again or chat us on Whatsapp",
                        "warning"
                    );
                    this.setState({ waiting: false });
                }
            })
            .catch((err) => {
                swalt(
                    "Error Sending Info",
                    "Kindly try again or chat us on Whatsapp",
                    "warning"
                );
                this.setState({ waiting: false });
            });
    };

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | MESSAGE ADMIN </title>
                </Helmet>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>CONTACT FORM</h1>
                    <h3>DROP A MESSAGE</h3>
                    <label>Type</label>
                    <select
                        name="messageType"
                        id="messageType"
                        className={styles.networkProvider}
                        onChange={this.onChange}
                        value={this.state.messageType}
                        required
                    >
                        <option value="" hidden>
                            Message Type
                        </option>
                        <option value="complain">Complain</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="other">Other</option>
                    </select>
                    <label>Message</label>
                    <textarea
                        onChange={this.onChange}
                        type="tel"
                        name="message"
                        id="message"
                        rows="8"
                        autoComplete="off"
                        placeholder="Dear Admin, I really love your service. I will write a complaint when needed"
                        value={this.state.message}
                        disabled={this.state.waiting}
                        required={true}
                    ></textarea>
                    <button
                        className={styles.button}
                        type="submit"
                        disabled={this.state.waiting}
                    >
                        {this.state.waiting ? <Spinner /> : "SEND MESSAGE"}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
