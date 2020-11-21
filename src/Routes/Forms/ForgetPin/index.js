import React, { Component } from "react";
import { Link } from "react-router-dom";

import spinner from "./../../../assets/images/logos/loading.png";

import Navbar from "./../../../Components/Navbar";

import styles from "./../style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
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
                    <span>RESET PASSWORD</span>
                    <form onSubmit={this.onSubmit} className={styles.form}>
                        <label>Email</label>
                        <input
                            onChange={this.onChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            value={this.state.email}
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
                        ©2020 Copyright TopMeUp Technologies. <br />
                        All Rights Reserved.
                    </p>
                </div>
            </>
        );
    }
}

export default index;
