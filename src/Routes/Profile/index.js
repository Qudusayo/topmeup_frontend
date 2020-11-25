import React, { Component } from "react";
import swal from "@sweetalert/with-react";
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
            lastName: "",
            userName: "",
            email: "",
            phoneNumber: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
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
        const api = `http://localhost:5000/getUserInfo/updateProfile`;
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

        const api = `http://localhost:5000/getUserInfo/updatePassword`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
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
