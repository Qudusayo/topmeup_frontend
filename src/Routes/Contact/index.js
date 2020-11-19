import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

import spinner from "./../../assets/images/logos/loading.png";

import styles from "./style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
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
                <form className={styles.Form}>
                    <h1>CONTACT FORM</h1>
                    <h3>DROP A MESSAGE</h3>
                    <textarea
                        onChange={this.onChange}
                        type="tel"
                        name="message"
                        id="message"
                        rows="8"
                        autoComplete="off"
                        placeholder="Dear Admin, I really love your service. I will write a complaint when needed"
                        value={this.state.message}
                        disabled={this.state.waiting}
                        required={true}
                    ></textarea>
                    <button
                        className={styles.button}
                        type="submit"
                        disabled={this.state.waiting}
                    >
                        {this.state.waiting ? (
                            <img
                                className={styles.spinner}
                                src={spinner}
                                alt="spinner"
                            />
                        ) : (
                            "SEND MESSAGE"
                        )}
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default index;
