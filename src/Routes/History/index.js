import React, { Component } from "react";
import Wrapper from "./../../Components/Container";
import axios from "axios";
// import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
        };
    }

    componentDidMount() {
        if (!sessionStorage.getItem("topuplab"))
            return this.props.history.push("/login");
        const api = `${process.env.REACT_APP_BACKEND_URI}/getHistory`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => this.setState({ history: response.data }));
    }

    render() {
        return (
            <Wrapper>
                <form className={[styles.Form, styles.loose].join(" ")}>
                    <h1>Transactions</h1>
                    <h3>Your Previous Transactions</h3>
                </form>
                {this.state.history
                    ? this.state.history.reverse().map((trans) => {
                          return (
                              <div
                                  className={[styles.card, styles.loose].join(
                                      " "
                                  )}
                              >
                                  <div className={[styles.infos].join(" ")}>
                                      <h4>{trans.type}</h4>
                                      <p>22:44, Nov 12, 2020</p>
                                  </div>
                                  <h2>₦{trans.amount}</h2>
                                  <div className={[styles.infos].join(" ")}>
                                      <p>Topped Up: {trans.reciever}</p>
                                      <p className={styles.success}>Success</p>
                                  </div>
                              </div>
                          );
                      })
                    : "No transactions Found"}
            </Wrapper>
        );
    }
}

export default index;
