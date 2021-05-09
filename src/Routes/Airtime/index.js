import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTransactionHistory } from "./../../actions/usersAction";
import Wrapper from "./../../Components/Container";

import Spinner from "./../../Components/Spinner";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reciever: "",
      amount: "",
      waiting: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      amount: this.state.amount,
      reciever: this.state.reciever,
    };
    const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/airtime`;
    const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
    const phoneNumberValidator = /^[0-9]{11}$/;

    if (
      !phoneNumberValidator.test(data.reciever) ||
      data.reciever.length !== 11
    ) {
      return this.error("Invalid Mobile Number");
    } else if (data.amount < 50) {
      return swalt("Airtime Purchase Failed", "Amount less than ₦50", "error");
    } else if (
      data.reciever.length < 11 ||
      data.reciever.length > 11 ||
      data.reciever[0] !== "0"
    ) {
      return swalt("Airtime Purchase Failed", "Invalid Phone Number", "error");
    }

    Swal.fire({
      title: "Verify Purchase",
      text: "You won't be able to revert this!",
      html: `<div><p style="display:flex;">Amount:-- <b>₦${this.state.amount}</b></p><p style="display:flex;">Number:-- <b>${this.state.reciever}</b></p></div>`,
      icon: "question",
      backdrop: "#00000090",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Purchase Airtime",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ waiting: true });
        axios
          .post(api, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res);
            if (!res.data.error) {
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
                title: "Airtime purchased successfully",
              });
              this.setState({
                amount: "",
                networkProvider: "",
                reciever: "",
              });
              this.props.getTransactionHistory();
              this.setState({ waiting: false });
            } else {
              swalt(
                "Airtime Purchase Failed",
                res.data.errorMsg
                  ? `${res.data.errorMsg}`
                  : "Error Completing Transaction",
                "warning"
              );
              this.setState({ waiting: false });
            }
          })
          .catch((err) => {
            console.log(err);
            swalt(
              "Airtime Purchase Failed",
              "Error  completing the transaction",
              "error"
            );
            this.setState({ waiting: false });
          });
      }
    });
  };

  autoFill = (value) => {
    this.setState({ amount: value });
  };

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>TOP UP LAB | AIRTIME PURCHASE </title>
        </Helmet>
        {/* <form className={styles.Form} onSubmit={this.onSubmit}>
          <h1>QUICK TOPUP</h1>
          <h3>PURCHASE AIRTIME</h3>
          <div className={styles.verification}>
            <div className={styles.line}>
              <span>Top Up Number</span>
            </div>
            <div className={styles.line}>
              <span>Network Provider</span>
            </div>
            <div className={styles.line}>
              <span>Amount</span>
            </div>
            <div className={styles.line}>
              <span>Discount</span>
            </div>
          </div>
          <button type="submit" disabled={this.state.waiting}>
            {this.state.waiting ? <Spinner /> : "PAY 97.00"}
          </button>
        </form> */}
        <form className={styles.Form} onSubmit={this.onSubmit}>
          <h1>QUICK TOPUP</h1>
          <h3>PURCHASE AIRTIME</h3>
          <label>Phone Number</label>
          <input
            onChange={this.onChange}
            type="tel"
            name="reciever"
            id="reciever"
            autoComplete="off"
            placeholder="Phone Number"
            pattern="^0[7-9]{1}[01]{1}[0-9]{8}"
            value={this.state.reciever}
            required={true}
            disabled={this.state.waiting}
          />
          <label>Amount</label>
          <span className={styles.inputHeavySymbolNaira}>
            <input
              onChange={this.onChange}
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              min="50"
              max="50000"
              placeholder="Amount"
              value={this.state.amount}
              required={true}
              disabled={this.state.waiting}
            />
          </span>
          <div className={styles.units}>
            <span onClick={() => this.autoFill("100")}>100</span>
            <span onClick={() => this.autoFill("200")}>200</span>
            <span onClick={() => this.autoFill("500")}>500</span>
            <span onClick={() => this.autoFill("1000")}>1000</span>
          </div>
          <button type="submit" disabled={this.state.waiting}>
            {this.state.waiting ? <Spinner /> : "PURCHASE AIRTIME"}
          </button>
        </form>
      </Wrapper>
    );
  }
}

Index.propsTypes = {
  getTransactionHistory: PropTypes.func.isRequired,
};

export default connect("", { getTransactionHistory })(Index);
