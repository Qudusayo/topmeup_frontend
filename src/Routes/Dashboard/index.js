import React, { Component } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Wrapper from "./../../Components/Container";

import styles from "./style.module.scss";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bonus: 0,
      balance: 0,
      today: "",
      username: "",
      refUrl: "http://topuplab.com.ng/register?ref=",
    };
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    if (!Cookies.get("_lab__topup")) return this.props.history.push("/login");
    const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo/balance`;
    const token = Cookies.get("_lab__topup");
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        const refUrl =
          this.state.refUrl +
          res.data.userName[0].toUpperCase() +
          res.data.userName.slice(1);
        this.setState({
          bonus: res.data.bonus,
          balance: res.data.balance,
          today,
          refUrl,
          username: res.data.userName,
        });
      });
  }

  copyUrl = () => {
    navigator.clipboard.writeText(this.state.refUrl);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Link Copied Successfully",
    });
  };

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>TOP UP LAB | DASHBOARD </title>
        </Helmet>
        <div className={styles.balances}>
          <div>
            <h2>Bonus</h2>
            <h1>₦ {this.state.bonus}</h1>
          </div>
          <div>
            <h2>Balance</h2>
            <h1>₦ {this.state.balance}</h1>
          </div>
        </div>
        <div className={[styles.card, styles.refLink].join(" ")}>
          <input value={this.state.refUrl} disabled onClick={this.copyUrl} />
          <button onClick={this.copyUrl}>COPY</button>
        </div>
        <div className={styles.cards}>
          <Link to="/data-subscription">
            <div>DATA BUNDLE</div>
          </Link>
          <Link to="/airtime-topup">
            <div>AIRTIME TOPUP</div>
          </Link>
          <Link to="/bill-payment">
            <div>UTILITY BILLS</div>
          </Link>
        </div>
        <div className={styles.cards}>
          <Link to="/cable-TV">
            <div>TV SUBSCRIPTION</div>
          </Link>
          <Link to="/buy-scratch-card">
            <div>SCRATCH CARD</div>
          </Link>
          <Link to="/transfer-fund">
            <div>TRANSFER MONEY</div>
          </Link>
        </div>
        <div className={styles.cards}>
          <Link to="/fund-wallet">
            <div>FUND WALLET</div>
          </Link>
          <a
            href="https://t.me/TopUpLab"
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: "#5682A3", color: "white" }}
          >
            <div>JOIN TELEGRAM</div>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=2347042467656&text=Hi%Support%20TopUpLab.Tell%20me%20more%20about%20your%20product%20"
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: "#127EB1", color: "white" }}
          >
            <div>CHAT ADMIN</div>
          </a>
        </div>
      </Wrapper>
    );
  }
}

export default index;
