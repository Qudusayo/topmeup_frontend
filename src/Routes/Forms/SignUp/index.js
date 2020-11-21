import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "./../../../Components/Navbar"

import spinner from "./../../../assets/images/logos/loading.png";

import styles from "./../style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            ref: "Qudusayo",
            username: "",
            firstName: "",
            lastName: "",
            tel: "",
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
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        if (!data.email) {
            return this.error("Email is required");
        } else if (!data.password) {
            return this.error("Password is required");
        } else if (data.password !== data.confirmPassword) {
            return this.error("Password doesn't match");
        } else if (data.password.length < 6) {
            return this.error("Password too short, 6 characters expected");
        } else {
            this.setState({ waiting: true });
            fetch("https://login-backend-e5394a.eu1.kinto.io/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.errorMsg) {
                        this.setState({
                            waiting: false,
                            email: response.email,
                            password: response.password,
                            confirmPassword: response.confirmPassword,
                        });
                        return this.error(response.message);
                    } else {
                        this.setState({
                            email: "",
                            password: "",
                            confirmPassword: "",
                            errorMessages: "",
                            waiting: false,
                        });
                        return this.error(response.message);
                    }
                })
                .catch((error) => {
                    this.setState({ waiting: false });
                    return this.error(
                        "Error  registering user, Kindly try again"
                    );
                });
        }
    };

    error = (message) => {
        this.setState({ errorMessages: message });
        setTimeout(() => {
            this.setState({ errorMessages: "" });
        }, 5000);
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
                        value={this.state.username}
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
                    {this.state.errorMessages ? (
                        <span className={styles.error}>
                            {this.state.errorMessages}
                        </span>
                    ) : null}
                    <button type="submit" disabled={this.state.waiting}>
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
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
                    ©2020 Copyright TopMeUp Technologies. <br />
                    All Rights Reserved.
                </p>
            </div>
            </>
        );
    }
}

export default index;
