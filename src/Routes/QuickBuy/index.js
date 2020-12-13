import React from "react";
import { Link } from "react-router-dom";

import styles from "./../Home/style.module.scss";

import Navbar from "./../../Components/Navbar";
import Footer from "./../../Components/Footer";
import Card from "./../Home/Card";

function index() {
    return (
        <>
            <Navbar />
            <div className={[styles.titles, "center"].join(" ")}>
                <h2>QUICK BUY ( Coming Soon!! )</h2>
                <span>
                    Quickly pucrhase your data here without registering
                </span>
            </div>

            <div className={styles.cards}>
                <Card styles="card25" network="mtn" anim="fade-up" delay="50">
                    <h1>MTN</h1>
                    {cardInfo("₦350 1GB")}
                </Card>
                <Card
                    styles="card25"
                    network="airtel"
                    anim="fade-up"
                    delay="450"
                >
                    <h1>AIRTEL</h1>
                    {cardInfo("₦980 1GB")}
                </Card>
                <Card styles="card25" network="glo" anim="fade-up" delay="850">
                    <h1>GLO</h1>
                    {cardInfo("₦950 1.8GB")}
                </Card>
                <Card
                    styles="card25"
                    network="nmobile"
                    anim="fade-up"
                    delay="1250"
                >
                    <h1>9MOBILE</h1>
                    {cardInfo("₦900 1.5GB")}
                </Card>
            </div>

            <div className={styles.label}>
                <div>
                    <h2>Contact us</h2>
                    <p>
                        Do you have any comments or questions about the products
                        then contact us.
                    </p>
                </div>
                <h1>+234 701 641 2041</h1>
            </div>
            <Footer />
        </>
    );
}

function cardInfo(value) {
    return (
        <>
            <p className={styles.line}>
                <b>{value}</b>
            </p>
            <p className={styles.line}>
                <b>1 Months Validity</b>
            </p>
            <p className={styles.line}>
                <b>4G LTE Support</b>
            </p>
            <p className={styles.line}>
                <b>Hotspot Sharing Support</b>
            </p>
            <p className={styles.line}>
                <b>Laptop Usage Support</b>
            </p>
            <p className={styles.line}>
                <b>iphones Usage Support</b>
            </p>
            <p className={styles.line}>
                <b>Multiple Devices Support</b>
            </p>
            <button className={styles.button}>PURCHASE NOW</button>
        </>
    );
}

export default index;
