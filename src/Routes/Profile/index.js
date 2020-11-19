import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";
import avatar from "./../../assets/images/avatar.png";

import styles from "./style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Ayoola",
            lastName: "Abdulqudus",
            phoneNumber: "07016412041",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
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
                <div className={styles.card}>
                    <img src={avatar} alt="avatar" />
                    <div>
                        <h2>AYOOLA ABDULQUDUS</h2>
                        <h1>QUDUSAYO</h1>
                        <p>qqudusayo@gmail.com</p>
                    </div>
                </div>
                <form className={styles.Form}>
                    <h3>UPDATE PROFILE</h3>
                    <input
                        onChange={this.onChange}
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="off"
                        placeholder="First Name"
                        value={this.state.firstName}
                        required={true}
                        disabled={this.state.waiting}
                    />
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
                    <input
                        onChange={this.onChange}
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        autoComplete="off"
                        placeholder="Phone Number"
                        value={this.state.phoneNumber}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {false ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "UPDATE PROFILE"
                        )}
                    </button>
                </form>
                <form className={styles.Form}>
                    <h3>UPDATE PASSWORD</h3>
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        autoComplete="off"
                        placeholder="Old Password"
                        required={true}
                        value={this.state.oldPassword}
                        disabled={this.state.waiting}
                    />
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        autoComplete="off"
                        placeholder="New Password"
                        required={true}
                        value={this.state.newPassword}
                        disabled={this.state.waiting}
                    />
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="off"
                        placeholder="Confirm Password"
                        required={true}
                        value={this.state.confirmPassword}
                        disabled={this.state.waiting}
                    />
                    <button type="submit" disabled={this.state.waiting}>
                        {false ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "UPDATE PASSWORD"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
