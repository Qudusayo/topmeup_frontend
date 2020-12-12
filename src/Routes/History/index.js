import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Wrapper from "./../../Components/Container";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: "rgb(0, 255, 106)",
            pending: "#FEE440",
            failed: "#EF233C",
        };
    }

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
                {this.props.history
                    ? this.props.history.reverse().map((trans, index) => {
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
                    : "No transactions Found"}
            </Wrapper>
        );
    }
}

Index.propTypes = {
    history: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.user.auth,
    history: state.user.history,
});

export default connect(mapStateToProps, {})(Index);
