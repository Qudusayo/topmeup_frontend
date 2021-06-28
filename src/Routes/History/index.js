import React, { Component } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Wrapper from "./../../Components/Container";
import Loader from "./loader";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            fullHistory: [],
            success: "rgb(0, 255, 106)",
            pending: "#FEE440",
            failed: "#EF233C",
            loading: true,
            quantity: 10,
        };
    }

    componentDidMount() {
        const api = `${process.env.REACT_APP_BACKEND_URI}/getHistory`;
        const token = Cookies.get('_lab__topup');
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    fullHistory: res.data,
                    history: res.data.reverse(),
                    quantity:
                        res.data.length % 10 > 1 ? res.data.length + 10 : 10,
                    loading: false,
                });
            });
    }

    fetchMoreData = () => {
        setTimeout(() => {
            this.setState({
                history: this.state.fullHistory.slice(
                    0,
                    this.state.fullHistory.length <= 10
                        ? this.state.fullHistory.length
                        : this.state.quantity
                ),
                quantity:
                    this.state.fullHistory.length % 10 > 1
                        ? this.state.fullHistory.length + 10
                        : this.state.quantity,
            });
        }, 1500);
    };

    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>TOP UP LAB | TRANSACTION HISTORY </title>
                </Helmet>
                <form className={[styles.Form, styles.loose].join(" ")}>
                    <h1>Transactions</h1>
                    <h3>Your Previous Transactions</h3>
                </form>
                {this.state.loading ? (
                    <Loader />
                ) : this.state.history.length ? (
                    this.state.history.map((trans, index) => {
                        return (
                            <div
                                className={[styles.card, styles.loose].join(
                                    " "
                                )}
                                key={index}
                            >
                                <div className={[styles.infos].join(" ")}>
                                    <h4>
                                        {trans.type}{" "}
                                        {trans.id ? (
                                            <small>( {trans.id} )</small>
                                        ) : null}
                                    </h4>
                                    <p>{trans.date}</p>
                                </div>
                                <h2>₦{parseFloat(trans.amount)}</h2>
                                <div className={[styles.infos].join(" ")}>
                                    <p>
                                        <b>Topped Up:</b> {trans.reciever}
                                    </p>
                                    <p
                                        className={styles.success}
                                        style={{
                                            backgroundColor: this.state[
                                                trans.status
                                            ],
                                        }}
                                    >
                                        {trans.status[0].toUpperCase() +
                                            trans.status.slice(1)}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    "No Transaction History"
                )}
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.user.auth,
});

export default connect(mapStateToProps, {})(Index);
