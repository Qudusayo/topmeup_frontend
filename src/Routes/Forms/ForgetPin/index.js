import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import spinner from "./../../../assets/images/logos/loading.png";

import Navbar from "./../../../Components/Navbar";

import styles from "./../style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            waiting: false
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
            email: this.state.email,
        };

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        if (!data.email) {
            return this.error("Email field is required!");
        } else {
            this.setState({ waiting: true });
            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URI}/forgetPassword`,
                    data
                )
                .then((response) => {
                    if (response.data.errorMsg) {
                        this.setState({ waiting: false });
                        return this.error("Error Reseting password");
                    } else {
                        Toast.fire({
                            icon: "success",
                            title: "Kindly check your Email (and Spam) to continue",
                        });
                        return this.props.history.push("/login");
                    }
                })
                .catch((error) => {
                    this.setState({ waiting: false });
                    return this.error("Error Reseting email, Kindly try again");
                });
        }
    };

    error = (message) => {
        this.setState({ errorMessages: message });
        this.errorAlert(message);
    };

    errorAlert = (message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "error",
            title: message,
        }).then(() => {
            this.setState({ errorMessages: "" });
        });
    };

    render() {
        return (
            <>
                <Navbar />
                <div className={styles.FormContainer}>
                    <h2 className={styles.title}>
                        <Link to="/">
                            TOP <span className="yellow">UP</span> LAB
                        </Link>
                    </h2>
                    <span>RESET PASSWORD</span>
                    <form onSubmit={this.onSubmit} className={styles.form}>
                        <label>Email</label>
                        <input
                            onChange={this.onChange}
                            disabled={this.state.waiting}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            value={this.state.email}
                            required={true}
                        />
                        <button type="submit" disabled={this.state.waiting}>
                            {this.state.waiting ? (
                                <img
                                    className={styles.spinner}
                                    src={spinner}
                                    alt="spinner"
                                />
                            ) : (
                                "RESET PASSWORD"
                            )}
                        </button>
                    </form>

                    <div className={styles.info}>
                        <span className={styles.sign}>
                            <Link to="/signup">Sign Up ?</Link>
                        </span>
                        <span className={styles.forget}>
                            <Link to="/login">LOGIN →</Link>
                        </span>
                    </div>
                    <p style={{ textAlign: "center", margin: "2em auto 0" }}>
                        ©2020 Copyright TopUpLab Technologies. <br />
                        All Rights Reserved.
                    </p>
                </div>
            </>
        );
    }
}

export default index;
