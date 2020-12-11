import React from "react";
import { withRouter } from "react-router-dom"
import styles from "./style.module.scss";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { PaystackButton } from "react-paystack";

function Index(props) {
    const config = {
        reference: new Date().getTime(),
        email: props.email,
        amount: props.amount,
        publicKey: process.env.REACT_PAYMENT_SECRET,
    };

    const handlePaystackSuccessAction = (reference) => {
        const data = {
            ...reference,
            amount: props.amount / 100,
            email: props.email,
        };
        const api = `${process.env.REACT_APP_BACKEND_URI}/transaction/onlinePayment`;
        const token = JSON.parse(sessionStorage.getItem("topuplab")).token;
        axios
            .post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.error===false) {
                    props.history.push("/dashboard");
                    return swal(
                        "Success !!!",
                        "Wallet topped up",
                        "success"
                        );
                } else {
                    props.history.push("/dashboard");
                    return swal(
                        "Error",
                        `Kindly Contact the admin for funding`,
                        "error"
                    );
                }
            })
            .catch((err) => {
                console.log("Loops Here")
                console.log(err)
                return swal(
                    "Error",
                    `Kindly Contact the admin for funding`,
                    "error"
                );
            });
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
    };

    const componentProps = {
        ...config,
        text: "Top Up Wallet",
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return <PaystackButton {...componentProps} className={styles.payButton} />;
}

export default withRouter(Index);
