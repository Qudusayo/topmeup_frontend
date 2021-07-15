import React, { Component } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Wrapper from "./../../Components/Container";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionID: "Transaction ID",
      initialBalance: 0,
      newBalance: 0,
      amount: 0,
      status: "",
      recipient: "",
      transactionType: "",
      date: "",
    };
  }

  componentDidMount() {
    const api = `${process.env.REACT_APP_BACKEND_URI}/getHistory`;
    const token = Cookies.get("_lab__topup");

    const id = this.props.match.params.id;

    axios
      .post(api, { id }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        this.setState({
          transactionID: res.data.id,
          initialBalance: res.data.additionalInfo.initialBalance,
          newBalance: res.data.additionalInfo.newBalance,
          amount: res.data.amount,
          status: res.data.status,
          recipient: res.data.queriedFor,
          transactionType: res.data.type,
          date: res.data.date,
        });
      });
  }

  goBack = () => {
    this.props.history.push("/history");
  };

  render() {
    return (
      <Wrapper>
        <div className={styles.Form}>
          <h1>Transaction</h1>
          <div className={[styles.infos].join(" ")}>
            <h4>Transaction ID :</h4>
            <p>{this.state.transactionID}</p>
          </div>
          <div className={[styles.infos].join(" ")}>
            <h4>Amount :</h4>
            <p>{this.state.amount}</p>
          </div>
          <div className={[styles.infos].join(" ")}>
            <h4>RECIPIENT :</h4>
            <p>{this.state.recipient}</p>
          </div>
          <div className={[styles.infos].join(" ")}>
            <h4>Transaction Type :</h4>
            <p>{this.state.transactionType}</p>
          </div>
          <div className={[styles.infos].join(" ")}>
            <h4>Initial Balance :</h4>
            <p>{this.state.initialBalance}</p>
          </div>
          <div className={[styles.infos].join(" ")}>
            <h4>New Balance :</h4>
            <p>{this.state.newBalance}</p>
          </div>
          <div className={[styles.infos].join(" ")}>
            <h4>Status :</h4>
            <p>{this.state.status}</p>
          </div>
          <div className={[styles.infos].join(" ")}>
            <h4>Date :</h4>
            <p>{this.state.date}</p>
          </div>
        </div>
        <div
          className={styles.Form}
          style={{ padding: "1em", textAlign: "center", cursor: "pointer" }}
          onClick={() => this.goBack()}
        >
          <h4>Go Back!</h4>
        </div>
      </Wrapper>
    );
  }
}

export default Index;
