import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authUser, getUserInfo } from "./../../../actions/usersAction";
import Navbar from "./../../../Components/Navbar";

import spinner from "./../../../assets/images/logos/loading.png";

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

        if (!data.userName) {
            return this.error("Username is required");
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
                <Navbar />
                <div className={styles.FormContainer}>
                    <h2 className={styles.title}>
                        <Link to="/">
                            TOP <span className="yellow">ME</span> UP
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
                            {this.state.waiting ? (
                                <img
                                    className={styles.spinner}
                                    src={spinner}
                                    alt="spinner"
                                />
                            ) : (
                                "LOGIN"
                            )}
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
                        ©2020 Copyright TopMeUp Technologies. <br />
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
};

export default connect("", { authUser, getUserInfo })(Index);
