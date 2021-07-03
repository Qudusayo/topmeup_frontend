import React, { Component } from "react";
import Cookies from "js-cookie";
import swal from "@sweetalert/with-react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Wrapper from "./../../Components/Container";

import { getTransactionHistory } from "./../../actions/usersAction";
import Spinner from "./../../Components/Spinner";

import Online from "./Online";

import styles from "./../Transfer/style.module.scss";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      payment: "",
      depositorsName: "",
      depositorsEmail: "",
      reservedAccount: {},
      processingAccount: true,
      activeAccount: false,
      accountNumber: '',
      amount: "",
      onlineAmount: "",
      onlinePayment: false,
      reservingAccount: false,
      waiting: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.makeOnlinePayment = this.makeOnlinePayment.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, tranferred: false });
  };

  onSubmit = (e) => {
    this.setState({ waiting: true });
    e.preventDefault();
    const data = {
      depositorsName: this.state.depositorsName,
      amount: this.state.amount,
    };
    const api = `${process.env.REACT_APP_BACKEND_URI}/sendInfo/payment`;
    const token = Cookies.get("_lab__topup");
    axios
      .post(api, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.error) {
          swal("Request Sent", "Payment will be updated shortly", "success");
          this.setState({
            depositorsName: "",
            amount: "",
            waiting: false,
          });
          this.props.getTransactionHistory();
          this.props.history.push("/dashboard");
        } else {
          swal(
            "Error Sending Info",
            "Kindly try again or chat us on Whatsapp",
            "warning"
          );
          this.setState({ waiting: false });
        }
      })
      .catch((err) => {
        swal(
          "Error Sending Info",
          "Kindly try again or chat us on Whatsapp",
          "warning"
        );
        this.setState({ waiting: false });
      });
  };

  generateAccount = (e) => {
    e.preventDefault();
    this.setState({ reservingAccount: true });

    const api = `${process.env.REACT_APP_BACKEND_URI}/monnifyCreate`;
    const token = Cookies.get("_lab__topup");

    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // console.log(res.data);
        if (!res.data.error) {
          swal("Bank Generated", "Kindly login again for update", "success");
        }
        this.props.history.push("/dashboard");
      });
  };

  componentDidMount() {
    const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo`;
    const token = Cookies.get("_lab__topup");

    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // console.log(res.data);
        this.setState({
          username: res.data.userName,
          reservedAccount: res.data.reservedAccount,
          accountNumber: res.data.reservedAccount.accountNumber,
          active: res.data.reservedAccount.active
            ? res.data.reservedAccount.active
            : false,
          processingAccount: false,
          depositorsEmail: this.props.userInfo.email,
        });
      });
    // console.log(this.state);
  }

  copyDetails = () => {
    navigator.clipboard.writeText(this.state.accountNumber);
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
      title: "Account Number Copied Successfully",
    });
  };

  makeOnlinePayment(e) {
    e.preventDefault();

    if (this.state.depositorsEmail !== this.props.userInfo.email) {
      return swal("Transaction Failed", "Invalid email address", "error");
    } else if (this.state.onlineAmount < 500 || !this.state.onlineAmount) {
      return swal("Data Purchase Failed", "Invalid Phone Number", "error");
    }

    if (!this.state.onlinePayment) {
      Swal.fire({
        title: "Verify Payment",
        text: "You won't be able to revert this!",
        html: `<div><p style="display:flex;">Amount:-- <b>₦${this.state.onlineAmount}</b></p><p style="display:flex;">Email:-- <b>${this.state.depositorsEmail}</b></p></div>`,
        icon: "question",
        backdrop: "#00000090",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continue",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setState({ onlinePayment: true });
        }
      });
    }
  }

  autoBankFill = (value) => {
    this.setState({ amount: value });
  };

  autoOnlineFill = (value) => {
    this.setState({ onlineAmount: value });
  };

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>TOP UP LAB | FUND WALLET</title>
        </Helmet>
        <div className={styles.card}>
          <h4>Hello</h4>
          <p>
            Before you can make any transaction on our platform, you must have
            enough balance. Kindly fund your wallet with as low as ₦100 through
            Online Payment or Auto Bank Payment and a minimum of ₦1000 through
            Bank Transfer Payment and start enjoying the Cheapest plan with
            TopUpLabs.
            <br />
            <b>
              NOTE: #50 Charge For transfers to your reserved account. Kindly
              consider the fee while sending
            </b>
            <br />
            Thanks for Choosing Us
          </p>
        </div>
        {this.state.active ? (
          <div
            className={[styles.card, styles.atm].join(" ")}
            onClick={this.copyDetails}
          >
            <h3>Wema Bank</h3>
            <h2 className={styles.number}>
              {this.state.reservedAccount.accountNumber}
            </h2>
            <h3>
              TOP UP LAB{" "}
              {this.state.username
                ? this.state.username.toUpperCase().slice(0, 3)
                : "USERNAME"}
            </h3>
            <span>BANK TRANSFER</span>
          </div>
        ) : (
          <form className={styles.Form} onSubmit={this.generateAccount}>
            <h1>Dedicated Account</h1>
            <h3>REQUEST AN ACCOUNT</h3>
            {!this.state.processingAccount && !this.state.activeAccount ? (
              <button type="submit" disabled={this.state.reservingAccount}>
                {this.state.reservingAccount ? (
                  <Spinner />
                ) : (
                  "GENERATE DEDICATED ACCOUNT"
                )}
              </button>
            ) : null}
          </form>
        )}
        <form className={styles.Form}>
          <h1>MAKE PAYMENT</h1>
          <h3>Payment can be done by using any of the options below:</h3>
          <label>Payment Method</label>
          <select
            name="payment"
            id="payment"
            onChange={this.onChange}
            value={this.state.payment}
            className={styles.networkProvider}
            required
          >
            <option value="" hidden>
              Select Payment Method
            </option>
            <option value="bankPayment">
              Bank Payment (Min ₦1000, 0% Fee)
            </option>
            <option value="onlinePayment">
              Online Payment (Min ₦500, 2% Fee)
            </option>
            <option value="airtimePayment">
              Airtime Payment (Min ₦120, 20% Fee)
            </option>
          </select>
          <br />
          {this.state.payment === "bankPayment" ? (
            <>
              <div className={styles.bankInfo}>
                <h4>0501764158</h4>
                <h4>Sterling Bank</h4>
                <h4>Abdulqudus Bolaji</h4>
                <br />
                <p>
                  Bank Deposit/Atm Transfer/Online Bank Transfer/ USSD & others
                  (Instant/Automated) (Minimum of #1,000): Payments are accepted
                  into any of our bank accounts stated on this page.
                </p>
              </div>
              <div className={styles.bankInfo}>
                <p>
                  <b>Kindly Fill the form below if transferred</b>
                </p>
                <p>
                  <b>
                    Note: If you've filled the form and your wallet is not
                    credited after 15 minutes, Kindly contact the{" "}
                    <a
                      style={{
                        textDecoration: "none",
                        color: "#127EB1",
                      }}
                      href="https://wa.me/message/YCC5HDYHVI4HA1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ADMIN Here
                    </a>
                  </b>
                </p>
                <p>
                  <b>
                    PLEASE DO NOT FILL THIS FORM IF YOU HAVE NOT MAKE THE
                    PAYMENT OR ELSE YOUR ACCOUNT WILL BE LOCKED.
                  </b>
                </p>
              </div>
            </>
          ) : null}
          {this.state.payment === "airtimePayment" ? (
            <div className={styles.bankInfo}>
              <h1>Airtime Payment</h1>
              <h3>Payment not automated</h3>
              <p>
                We're working hard to get you the best payment method. Kindly
                contact the admin on how to make payment with this. Note that
                charges may apply with this type of payment. Kindly bear with
                us. Thanks for using our service
              </p>
            </div>
          ) : null}
        </form>
        {this.state.payment === "onlinePayment" ? (
          <form className={styles.Form} onSubmit={this.makeOnlinePayment}>
            <h1>ONLINE PAYMENT</h1>
            <h3>SUBMIT A REQUEST</h3>
            <label>Depositors Email</label>
            <input
              onChange={this.onChange}
              type="text"
              name="depositorsEmail"
              id="depositorsEmail"
              autoComplete="off"
              placeholder="Depositors Email"
              value={this.state.depositorsEmail}
              required={true}
              disabled={true}
            />
            <label>Amount</label>
            <span className={styles.inputHeavySymbolNaira}>
              <input
                onChange={this.onChange}
                type="number"
                name="onlineAmount"
                id="onlineAmount"
                autoComplete="off"
                placeholder="Amount"
                value={this.state.onlineAmount}
                min="500"
                required={true}
                disabled={this.state.onlinePayment}
              />
            </span>
            <div className={styles.units}>
              <span onClick={() => this.autoOnlineFill("500")}>500</span>
              <span onClick={() => this.autoOnlineFill("1000")}>1000</span>
              <span onClick={() => this.autoOnlineFill("2000")}>2000</span>
              <span onClick={() => this.autoOnlineFill("5000")}>5000</span>
            </div>
            {!this.state.onlinePayment ? (
              <button type="submit" disabled={this.state.waiting}>
                {this.state.waiting ? <Spinner /> : "PROCEED"}
              </button>
            ) : (
              <Online
                email={this.state.depositorsEmail}
                amount={
                  (parseInt(this.state.onlineAmount) +
                    (2 / 100) * parseInt(this.state.onlineAmount)) *
                  100
                }
              />
            )}
          </form>
        ) : null}
        {this.state.payment === "bankPayment" ? (
          <form className={styles.Form} onSubmit={this.onSubmit}>
            <h1>BANK PAYMENT</h1>
            <h3>SUBMIT A REQUEST</h3>
            <label>Depositors Name</label>
            <input
              onChange={this.onChange}
              type="text"
              name="depositorsName"
              id="depositorsName"
              autoComplete="off"
              placeholder="Depositors Name"
              value={this.state.depositorsName}
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
                placeholder="Amount"
                value={this.state.amount}
                min="1000"
                required={true}
                disabled={this.state.waiting}
              />
            </span>
            <div className={styles.units}>
              <span onClick={() => this.autoBankFill("1000")}>1000</span>
              <span onClick={() => this.autoBankFill("2000")}>2000</span>
              <span onClick={() => this.autoBankFill("4000")}>4000</span>
              <span onClick={() => this.autoBankFill("5000")}>5000</span>
            </div>
            <button type="submit" disabled={this.state.waiting}>
              {this.state.waiting ? <Spinner /> : "SUBMIT"}
            </button>
          </form>
        ) : null}
      </Wrapper>
    );
  }
}

Index.propsTypes = {
  userInfo: PropTypes.object.isRequired,
  getTransactionHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, { getTransactionHistory })(Index);
