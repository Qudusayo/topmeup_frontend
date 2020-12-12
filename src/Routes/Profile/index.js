import React, { Component } from "react";
import swal from "@sweetalert/with-react";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserInfo } from "./../../actions/usersAction";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";
import avatar from "./../../assets/images/avatar.png";

import styles from "./style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            price: 1500,
            lastName: "",
            userName: "",
            email: "",
            phoneNumber: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            upgradingUser: false,
            updatingProfile: false,
            updatingPassword: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        this.setState({ updatingProfile: true });
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo/updateProfile`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (!res.data.error) {
                    this.props.getUserInfo();
                    swal(
                        "Completed",
                        "Profile updated successfully",
                        "success"
                    );
                    this.setState({ updatingProfile: false });
                } else {
                    swal("Oops", "Error updating profile", "warning");
                    this.setState({ updatingProfile: false });
                }
            })
            .catch((err) => {
                swal("Oops", "Error updating profile", "warning");
                this.setState({ updatingProfile: false });
            });
    };

    onSubmitPassword = (e) => {
        this.setState({ updatingPassword: true });
        e.preventDefault();
        const data = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
        };
        if (data.confirmPassword !== data.newPassword)
            return swal("Error", "New password mis-match", "warning");

        const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo/updatePassword`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (!res.data.error) {
                    swal(
                        "Completed",
                        "Password updated successfully",
                        "success"
                    );
                    this.setState({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                        updatingPassword: false,
                    });
                } else {
                    swal("Oops", "Incorrect Password", "warning");
                    this.setState({ updatingPassword: false });
                }
            })
            .catch((err) => {
                swal("Oops", "Error updating password", "warning");
                this.setState({ updatingPassword: false });
            });
    };

    onTriggerUpgrade = (e) => {
        e.preventDefault();
        const data = {
            userName: this.props.userInfo.userName,
            price: this.state.price,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/payment/upgrade`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;

        if (!data.userName || data.price < 1500)
            return swal("Error", "Invalid Transaction Details", "warning");

        Swal.fire({
            title: "Upgrade User",
            text: "You won't be able to revert this!",
            html: `<div><p style="display:flex;">Amount:-- <b>₦${
                this.state.price
            }</b></p><p style="display:flex;">User:-- <b>${data.userName.toUpperCase()}</b></p></div>`,
            icon: "question",
            backdrop: "#00000090",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Upgrade User",
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({ upgradingUser: true });
                axios
                    .post(api, data, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (!res.data.error) {
                            swal(
                                "Upgraded",
                                "User upgraded successfully",
                                "success"
                            );
                            this.props.history.push("/dashboard");
                        } else {
                            swal("Oops", "Error Upgrading user", "error");
                            this.setState({ upgradingUser: false });
                        }
                    })
                    .catch((err) => {
                        swal("Oops", "Error Upgrading password", "error");
                        this.setState({ upgradingUser: false });
                    });
            }
        });
    };

    componentDidMount() {
        this.setState({
            firstName: this.props.userInfo.firstName,
            lastName: this.props.userInfo.lastName,
            userName: this.props.userInfo.userName,
            email: this.props.userInfo.email,
            phoneNumber: this.props.userInfo.phoneNumber,
        });
    }

    render() {
        return (
            <Wrapper>
                <div className={styles.card}>
                    <img src={avatar} alt="avatar" />
                    <div>
                        <h2>
                            {this.props.userInfo.firstName}{" "}
                            {this.props.userInfo.lastName}
                        </h2>
                        <h1>{this.props.userInfo.userName.toUpperCase()}</h1>
                        <p>{this.props.userInfo.email}</p>
                    </div>
                </div>
                {this.props.userInfo.accountType === "free" ? (
                    <form
                        className={styles.Form}
                        onSubmit={this.onTriggerUpgrade}
                    >
                        <h3 style={{ marginBottom: "0" }}>
                            UPGRADE TO PREMIUM
                        </h3>
                        <span
                            style={{
                                textAlign: "center",
                                display: "block",
                                fontSize: ".8em",
                            }}
                        >
                            One-time Payment of <b>₦1500</b>
                        </span>
                        <label>First Name</label>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="off"
                            placeholder="Username"
                            value={this.props.userInfo.userName.toUpperCase()}
                            required={true}
                            disabled={true}
                        />
                        <label>Price</label>
                        <input
                            onChange={this.onChange}
                            type="number"
                            name="price"
                            id="price"
                            autoComplete="off"
                            placeholder="Price"
                            value={this.state.price}
                            required={true}
                            disabled={true}
                        />
                        <button
                            type="submit"
                            disabled={this.state.upgradingUser}
                        >
                            {this.state.upgradingUser ? (
                                <img
                                    className={styles.spinner}
                                    src={spinner}
                                    alt="spinner"
                                />
                            ) : (
                                "UPGRADE TO PREMIUM"
                            )}
                        </button>
                    </form>
                ) : null}
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <h3>UPDATE PROFILE</h3>
                    <label>First Name</label>
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
                        name="phoneNumber"
                        id="phoneNumber"
                        autoComplete="off"
                        placeholder="Phone Number"
                        value={this.state.phoneNumber}
                        required={true}
                        disabled={this.state.waiting}
                    />
                    <button type="submit" disabled={this.state.updatingProfile}>
                        {this.state.updatingProfile ? (
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
                <form className={styles.Form} onSubmit={this.onSubmitPassword}>
                    <h3>UPDATE PASSWORD</h3>
                    <label>Old Password</label>
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
                    <label>New Password</label>
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
                    <label>Confirm Password</label>
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
                    <button
                        type="submit"
                        disabled={this.state.updatingPassword}
                    >
                        {this.state.updatingPassword ? (
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

Index.propTypes = {
    userInfo: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.user.auth,
    userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, { getUserInfo })(Index);
