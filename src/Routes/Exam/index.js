import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import Wrapper from "./../../Components/Container";

// import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            quantity: "",
            waiting: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            quantity: this.state.quantity,
            type: this.state.type,
            cost:
                this.state.type.toLowerCase() === "waec"
                    ? 1750 * this.state.quantity
                    : 700 * this.state.quantity,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/exam`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;

        if (!["waec", "neco"].includes(data.type.toLowerCase())) {
            return swalt(
                "Pin Purchase Failed",
                "Invalid transaction details",
                "error"
            );
        } else if (data.quantity < 1 || data.quantity > 5) {
            return swalt(
                "Pin Purchase Failed",
                "Should be less or equal to  5 and greater or equal to 1",
                "error"
            );
        }

        Swal.fire({
            title: "Verify Purchase",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Cost:-- <b>₦${
                data.cost
            }</b></p><p style="display:flex;">Exam type:-- <b>${data.type.toUpperCase()}</b></p> <p style="display:flex;">Quantity:-- <b>${
                data.quantity
            }</b></p></div>`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Purchase PIN",
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({ waiting: true });
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
                                title: "PIN purchased successfully",
                            });
                            this.setState({
                                quantity: "",
                                type: "",
                            });
                            this.props.history.push("/dashboard");
                        } else {
                            swalt(
                                "PIN Purchase Failed",
                                `${res.data.errorMsg}`,
                                "warning"
                            );
                            this.setState({ waiting: false });
                        }
                    })
                    .catch((err) => {
                        swalt(
                            "PIN Purchase Failed",
                            "Error  completing the transaction",
                            "error"
                        );
                        this.setState({ waiting: false });
                    });
            }
        });
    };

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | EXAM CARD</title>
                </Helmet>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h1>EXAMINATION PIN</h1>
                    <h3>COMING SOON!!</h3>
                    <label>Examination Type</label>
                    <select
                        name="type"
                        id="type"
                        className={styles.networkProvider}
                        required={true}
                        onChange={this.onChange}
                    >
                        <option value="" hidden>
                            Examination Type
                        </option>
                        <option value="WAEC">WAEC (Cost ₦1750)</option>
                        <option value="NECO">NECO (Cost ₦700)</option>
                    </select>
                    <label>Quantity</label>
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
                        min="1"
                        max="5"
                    />
                    {/* <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "REQUEST PIN"
                        )}
                    </button> */}
                </form>
            </Wrapper>
        );
    }
}

export default index;
