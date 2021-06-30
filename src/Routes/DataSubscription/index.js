import React, { Component } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import swalt from "@sweetalert/with-react";
import Swal from "sweetalert2";
import axios from "axios";
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
      networkProvider: "",
      dataPlan: "",
      reciever: "",
      waiting: false,
      verifying: false,
      verifiedNetwork: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    if (`${[e.target.id]}` === "reciever") {
      if (e.target.value !== this.state.reciever) {
        this.setState({
          verifiedNetwork: false,
        });
      }
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  verifyNetwork = () => {
    const phoneNumberValidator = /^0[7-9]{1}[01]{1}[0-9]{8}/;
    const token = Cookies.get("_lab__topup");
    const api = `${process.env.REACT_APP_BACKEND_URI}/verifyNetwork`;
    const data = {
      phone: this.state.reciever,
    };

    if (!phoneNumberValidator.test(data.phone) || data.phone.length !== 11) {
      return swalt("Verification Failed", "Invalid Phone Number", "error");
    }

    this.setState({ verifying: true });

    axios
      .post(api, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { carrier } = res.data;
        if (carrier === "9mobile") {
          this.setState({ networkProvider: "nmobile" });
        } else if (carrier.toLowerCase() === "glo") {
          this.setState({ networkProvider: "globacom" });
        } else if (
          !["airtel", "glo", "mtn", "9mobile"].includes(carrier.toLowerCase())
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "Invalid mobile number",
            showConfirmButton: false,
            timer: 3000,
          });
          return this.setState({ verifying: false });
        } else {
          this.setState({ networkProvider: carrier.toLowerCase() });
        }
        return this.setState({
          verifying: false,
          verifiedNetwork: true,
        });
      })
      .catch((err) => {
        return this.setState({ verifying: false });
      });
  };

  cancel = () => {
    Swal.fire({
      title: "Cancel Purchase",
      text: "Sure you want to cancel the purchase",
      icon: "warning",
      backdrop: "#00000090",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ verifying: false, verifiedNetwork: false });
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      networkProvider: this.state.networkProvider,
      dataPlan: this.state.dataPlan,
      reciever: this.state.reciever,
    };
    const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/data`;
    const token = Cookies.get("_lab__topup");
    const phoneNumberValidator = /^[0-9]{11}$/;

    if (
      !["mtn", "nmobile", "globacom", "airtel"].includes(data.networkProvider)
    ) {
      return swalt(
        "Data Purchase Failed",
        "Invalid transaction details",
        "error"
      );
    } else if (
      !phoneNumberValidator.test(data.reciever) ||
      data.reciever.length !== 11
    ) {
      return swalt("Data Purchase Failed", "Invalid Phone Number", "error");
    }

    Swal.fire({
      title: "Verify Purchase",
      text: "You won't be able to revert this!",
      html: `<div><p style="display:flex;">Amount:-- <b>₦${
        this.state.dataPlan
      }</b></p><p style="display:flex;">Network Provider:-- <b>${this.state.networkProvider.toUpperCase()}</b></p> <p style="display:flex;">Number:-- <b>${
        this.state.reciever
      }</b></p></div>`,
      icon: "question",
      backdrop: "#00000090",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Purchase Data Plan",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ waiting: true });
        axios
          .post(api, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res);
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
                title: "Data Subscription successful",
              });
              this.setState({
                networkProvider: "",
                dataPlan: "",
                reciever: "",
                waiting: false,
                verifiedNetwork: false,
              });
              this.props.getTransactionHistory();
            } else {
              swalt(
                "Data Subscription Failed",
                res.data.errorMsg
                  ? `${res.data.errorMsg}`
                  : "Error Completing Transaction",
                "warning"
              );
              this.setState({ waiting: false });
            }
          })
          .catch((err) => {
            swalt(
              "Data Subscription Failed",
              "Error  completing the transaction",
              "error"
            );
            this.setState({ waiting: false });
          });
      }
    });
  };

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>TOP UP LAB | PURCHASE DATA </title>
        </Helmet>
        <form className={styles.Form} onSubmit={this.onSubmit}>
          <h1>DATA BUNDLE</h1>
          <h3>PURCHASE DATA</h3>
          <label>Recievers Number</label>
          <input
            onChange={this.onChange}
            type="tel"
            name="reciever"
            id="reciever"
            pattern="^0[7-9]{1}[01]{1}[0-9]{8}"
            autoComplete="off"
            placeholder="Phone Number"
            value={this.state.reciever}
            required={true}
            disabled={this.state.waiting}
          />
          {this.state.verifiedNetwork ? null : (
            <button
              type="button"
              disabled={this.state.verifying}
              onClick={this.verifyNetwork}
            >
              {this.state.verifying ? <Spinner /> : "Verify Network"}
            </button>
          )}
          {this.state.verifiedNetwork ? (
            <>
              <label>
                Data Plan ( <b>{this.state.networkProvider.toUpperCase()}</b> )
              </label>
              <select
                name="dataPlan"
                id="dataPlan"
                className={styles.networkProvider}
                onChange={this.onChange}
                value={this.state.dataPlan}
                required
              >
                <option value="" hidden>
                  {this.state.networkProvider.toUpperCase()} Data Plan
                </option>
                {this.props.dataSubscription[this.state.networkProvider]
                  ? this.props.dataSubscription[this.state.networkProvider].map(
                      (network, index) => {
                        return (
                          <option value={network.price} key={index}>
                            {network.name} --- ₦{network.price}
                          </option>
                        );
                      }
                    )
                  : null}
              </select>
              <button
                type="button"
                onClick={this.cancel}
                disabled={this.state.waiting}
                className={styles.cancel}
              >
                CANCEL
              </button>
              <button type="submit" disabled={this.state.waiting}>
                {this.state.waiting ? <Spinner /> : "PURCHASE"}
              </button>
            </>
          ) : null}
        </form>
        <div className={styles.Form}>
          <h3>Codes for Data Balance:</h3>
          <ul>
            <li>
              <b>MTN</b> : *131*4#
            </li>
            <li>
              <b>AIRTEL</b> : *140#
            </li>
            <li>
              <b>9MOBILE</b> : *228#
            </li>
            <li>
              <b>GLOBACOM</b> : *127*0#.
            </li>
          </ul>
        </div>
      </Wrapper>
    );
  }
}

Index.propsTypes = {
  getTransactionHistory: PropTypes.func.isRequired,
  dataSubscription: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dataSubscription: state.user.dataSubscription,
});

export default connect(mapStateToProps, { getTransactionHistory })(Index);
