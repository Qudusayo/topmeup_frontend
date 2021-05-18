import React, { Component } from "react";
import { Helmet } from "react-helmet";
import qs from "qs";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import Navbar from "./../../../Components/Navbar";

import Spinner from "./../../../Components/Spinner";

import styles from "./../style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
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
            confirmPassword: this.state.confirmPassword,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/resetPassword/updatePassword`;
        const token = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        }).__reset;
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

        if (!data.userName && !data.password && !data.confirmPassword) {
            return this.error("All fields are required");
        } else if (data.password !== data.confirmPassword) {
            return this.error("Password doesn't match");
        } else if (data.password.length < 6) {
            return this.error("Password too short, min of 6 chars");
        } else {
            this.setState({ waiting: true });
            axios
                .post(api, data, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.data.errorMsg) {
                        this.setState({ waiting: false });
                        return this.error(response.data.errorMsg);
                    } else {
                        Toast.fire({
                            icon: "success",
                            title: "Password Updated successfully",
                        });
                        return this.props.history.push("/login");
                    }
                })
                .catch((error) => {
                    this.setState({ waiting: false });
                    return this.error("Error Updating, Kindly try again");
                });
        }
    };

    componentDidMount() {
        let token = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        }).__reset;
        if (!token) return this.props.history.push("/login");
        const api = `${process.env.REACT_APP_BACKEND_URI}/resetPassword/getUserName`;
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                this.setState({ username: res.data.userName });
            });
    }

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
                    <title>TOP UP LAB | FORGET PASSWORD</title>
                </Helmet>
                <Navbar />
                <div className={styles.FormContainer}>
                    <h2 className={styles.title}>
                        <Link to="/">
                            TOP <span className="yellow">UP</span> LAB
                        </Link>
                    </h2>
                    <span>RESET PASSWORD</span>
                    <form onSubmit={this.onSubmit} className={styles.form}>
                        <label>Username</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            autoComplete="off"
                            value={this.state.username}
                            required={true}
                            disabled={true}
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
                        <label>Confirm Password</label>
                        <input
                            onChange={this.onChange}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="▪▪▪▪▪▪▪▪▪▪▪▪"
                            value={this.state.confirmPassword}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <button type="submit" disabled={this.state.waiting}>
                            {this.state.waiting ? (
                                <Spinner />
                            ) : (
                                "UPDATE PASSWORD"
                            )}
                        </button>
                    </form>
                    <div className={styles.info}>
                        <span className={styles.sign}>
                            <Link to="/login">Login →</Link>
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

export default Index;
