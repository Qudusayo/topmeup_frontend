import React, { Component } from "react";
import { Helmet } from "react-helmet";
import qs from "qs";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Navbar from "./../../../Components/Navbar";

import Spinner from "./../../../Components/Spinner";

import styles from "./../style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            tel: "",
            ref: "Qudusayo",
            password: "",
            confirmPassword: "",
            errorMessages: "",
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            userName: this.state.username,
            phoneNumber: this.state.tel,
            referredBy: this.state.ref,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
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
        if (
            !data.email &&
            !data.firstName &&
            !data.lastName &&
            !data.userName &&
            !data.phoneNumber &&
            !data.password &&
            !data.confirmPassword
        ) {
            return this.error("All fields are required");
        } else if (data.password !== data.confirmPassword) {
            return this.error("Password doesn't match");
        } else if (data.password.length < 6) {
            return this.error("Password too short, min of 6 chars");
        } else {
            this.setState({ waiting: true });
            axios
                .post(`${process.env.REACT_APP_BACKEND_URI}/signup`, data)
                .then((response) => {
                    if (response.data.error) {
                        this.setState({
                            waiting: false,
                        });
                        return this.error(response.data.errorMsg);
                    } else {
                        this.setState({
                            firstName: "",
                            lastName: "",
                            email: "",
                            username: "",
                            tel: "",
                            ref: "Qudusayo",
                            password: "",
                            confirmPassword: "",
                            errorMessages: "",
                            waiting: false,
                        });
                        Toast.fire({
                            icon: "success",
                            title: "Registration successfully",
                        });

                        return this.props.history.push("/login");
                    }
                })
                .catch((error) => {
                    this.setState({ waiting: false });
                    return this.error(
                        "Error registering user, Kindly try again"
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

    componentDidMount() {
        let ref = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        }).ref;
        if (ref) return this.setState({ ref })
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>TOP UP LAB | REGISTER</title>
                </Helmet>
                <Navbar />
                <div className={styles.FormContainer}>
                    <h2 className={styles.title}>
                        <Link to="/">
                            TOP <span className="yellow">UP</span> LAB
                        </Link>
                    </h2>
                    <span>CREATE ACCOUNT</span>
                    <form onSubmit={this.onSubmit} className={styles.form}>
                        <label>Referral</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="ref"
                            id="ref"
                            autoComplete="off"
                            placeholder="Referral Username"
                            value={this.state.ref}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <label>First Name</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="firstName"
                            id="firstName"
                            autoComplete="off"
                            placeholder="FirstName"
                            value={this.state.firstName}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <label>Last Name</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="lastName"
                            id="lastName"
                            autoComplete="off"
                            placeholder="Last Name"
                            value={this.state.lastName}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <label>Phone Number</label>
                        <input
                            onChange={this.onChange}
                            type="tel"
                            name="tel"
                            id="tel"
                            autoComplete="off"
                            placeholder="Phone Number"
                            value={this.state.tel}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <label>Username</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="off"
                            placeholder="Username"
                            value={this.state.userame}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <label>Email</label>
                        <input
                            onChange={this.onChange}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            placeholder="Email"
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
                            placeholder="Password"
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
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            required={true}
                            disabled={this.state.waiting}
                        />
                        <button type="submit" disabled={this.state.waiting}>
                            {this.state.waiting ? (
                                <Spinner />
                            ) : (
                                "CREATE ACCOUNT"
                            )}
                        </button>
                    </form>

                    <div className={styles.info}>
                        <span className={styles.forget}>
                            Already a member ? <Link to="/login">Login →</Link>
                        </span>
                    </div>
                    <p style={{ textAlign: "center", margin: "2em auto 2em" }}>
                        ©2020 Copyright TopUpLab Technologies. <br />
                        All Rights Reserved.
                    </p>
                </div>
            </>
        );
    }
}

export default index;
