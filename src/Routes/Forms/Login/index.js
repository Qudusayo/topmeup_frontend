import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    authUser,
    getUserInfo,
    getTransactionHistory,
    getDataSubscription,
    getTvSubscription,
} from "./../../../actions/usersAction";
import Navbar from "./../../../Components/Navbar";

import Spinner from "./../../../Components/Spinner";

import styles from "./../style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
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
            userName: this.state.username,
            password: this.state.password,
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

        const usernameValidator = /^[a-zA-Z1-9]+$/;

        if (!data.userName) {
            return this.error("Username is required");
        } else if (!usernameValidator.test(data.userName.toLowerCase())) {
            return this.error("Invalid Username");
        } else if (!data.password) {
            return this.error("Password is required");
        } else {
            this.setState({ waiting: true });
            axios
                .post(`${process.env.REACT_APP_BACKEND_URI}/login`, data)
                .then((response) => {
                    if (response.data.errorMsg) {
                        this.setState({ waiting: false });
                        return this.error("Invalid username or password");
                    } else {
                        sessionStorage.setItem(
                            "topuplab",
                            JSON.stringify({ token: response.data.accessToken })
                        );
                        this.props.authUser();
                        this.props.getUserInfo();
                        this.props.getTvSubscription();
                        this.props.getDataSubscription();
                        this.props.getTransactionHistory();

                        Toast.fire({
                            icon: "success",
                            title: "Signed in successfully",
                        });
                        return this.props.history.push("/dashboard");
                    }
                })
                .catch((error) => {
                    this.setState({ waiting: false });
                    return this.error(
                        "Error Fetching user info, Kindly try again"
                    );
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
                <Helmet>
                    <title>TOP UP LAB | LOGIN</title>
                </Helmet>
                <Navbar />
                <div className={styles.FormContainer}>
                    <h2 className={styles.title}>
                        <Link to="/">
                            TOP <span className="yellow">UP</span> LAB
                        </Link>
                    </h2>
                    <span>LOGIN USER</span>
                    <form onSubmit={this.onSubmit} className={styles.form}>
                        <label>Username</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            autoComplete="off"
                            value={this.state.email}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <label>Password</label>
                        <input
                            onChange={this.onChange}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="▪▪▪▪▪▪▪▪▪▪▪▪"
                            value={this.state.password}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <button type="submit" disabled={this.state.waiting}>
                            {this.state.waiting ? <Spinner /> : "LOGIN"}
                        </button>
                    </form>
                    <div className={styles.info}>
                        <span className={styles.sign}>
                            <Link to="/register">Sign Up ?</Link>
                        </span>
                        <span className={styles.forget}>
                            <Link to="/forget-password">Forget Password →</Link>
                        </span>
                    </div>
                    <p style={{ textAlign: "center", margin: "2em auto 2em" }}>
                        ©2021 Copyright TopUpLab Technologies. <br />
                        All Rights Reserved.
                    </p>
                </div>
            </>
        );
    }
}

Index.propsTypes = {
    authUser: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    getTransactionHistory: PropTypes.func.isRequired,
    getDataSubscription: PropTypes.func.isRequired,
    getTvSubscription: PropTypes.func.isRequired,
};

export default connect("", {
    authUser,
    getUserInfo,
    getTransactionHistory,
    getDataSubscription,
    getTvSubscription,
})(Index);
