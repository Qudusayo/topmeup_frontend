import React from "react";
import { Link } from "react-router-dom";

import styles from "./../Home/style.module.scss";

import logo1 from "./../../assets/images/logos/fast-dlivery.svg";
import logo2 from "./../../assets/images/logos/safe-payment.svg";
import logo3 from "./../../assets/images/logos/certified-adviser.svg";
import logo4 from "./../../assets/images/logos/internet.svg";
import logo5 from "./../../assets/images/logos/mobile.svg";
import logo6 from "./../../assets/images/logos/television.svg";
import logo7 from "./../../assets/images/logos/cash.svg";
import logo8 from "./../../assets/images/logos/electricity-bill.svg";
import logo9 from "./../../assets/images/logos/messages.svg";

import Navbar from "./../../Components/Navbar";
import Footer from "./../../Components/Footer";
import Banner from "./../Home/Banner";
import Card from "./../Home/Card";
import Testimonial from "./../Home/Testimonial";
import Contact from "./../Home/Contact";

function index() {
    return (
        <>
            <Navbar />
            <div className={styles.home}>
                <div
                    className={[styles.titles, "center"].join(" ")}
                    style={{
                        display: "block",
                        width: "95%",
                        textAlign: "left",
                    }}
                >
                    <h2 style={{ marginTop: "-2em", textAlign: "center" }}>
                        ABOUT US
                    </h2>
                    <div>
                        <p>
                            <b>TOPUPLAB</b> is a product of Virtual Top Up
                            registered in providing innovative communication
                            technologies, We offer a multipurpose portal where
                            users signs up and subscribe for any desired
                            services such as IBEDC, IKEDC, EKEDC, purchase of
                            airtime and data bundle, buy WASSCE/NECO pin, from
                            any of the telecoms networks in Nigeria here listed.
                        </p>
                        <p>
                            <b>We offer</b> instant recharge of Airtime,
                            Databundle,With expertise ranging from web
                            technologies to telecom and a wide array of ICT
                            solutions, you can be sure that you are in safe
                            hands. CableTV (DStv, GOtv & Startimes), Electricity
                            Bill Payment and so much more.
                        </p>
                        <p>
                            <b>This portal offers</b> the opportunity to buy any of the
                            services with great discounts or make earnsmeet with
                            it with great commission rates.
                            <br /> You can pay your bills at your convenience at
                            any point in time right from the comfort of your
                            home or office even while on transit travelling to
                            anywhere in World. <b>REGISTRATION IS FREE FOR ALL</b>
                        </p>
                    </div>
                </div>
                <div className={[styles.titles, "center"].join(" ")}>
                    <h2>OUR FEATURES</h2>
                    <span>The qualities that we have </span>
                </div>
                <div className={styles.cards}>
                    <Card
                        styles="card30"
                        info="Our Data delivery and wallet funding is automated, Airtime topup and data purchase are automated and get delivered to you almost instantly.."
                        src={logo1}
                        title="We're Fast"
                        anim="fade-up"
                        delay="50"
                    />
                    <Card
                        styles="card30"
                        info="Your wallet is the safest means of transacting with your mobile airtime. Your funds in your wallet can be kept as long as you want and it’s secured."
                        src={logo2}
                        title="You're Safe"
                        anim="fade-up"
                        delay="450"
                    />
                    <Card
                        styles="card30"
                        info="With our several years of experience and engineers, we have learnt in the past years to be able to fully optimize our platform for reliability and dependability.."
                        src={logo3}
                        title="We're Reliable"
                        anim="fade-up"
                        delay="850"
                    />
                </div>

                <div className={styles.label}>
                    <div>
                        <h2>Contact us</h2>
                        <p>
                            Do you have any comments or questions about the
                            products then contact us.
                        </p>
                    </div>
                    <h1>+234 701 641 2041</h1>
                </div>

                <div className={[styles.titles, "center"].join(" ")}>
                    <h2>TESTIMONIAL</h2>
                    <span>See what our Customers are saying about us:</span>
                </div>
                <Testimonial />

                <div className={[styles.titles, "center"].join(" ")}>
                    <h2>CONTACT US</h2>
                    <span>Have enquiries ? Please contact us.</span>
                </div>
                <Contact />
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
            <Link to="/dashboard">
                <button className={styles.button}>PURCHASE NOW</button>
            </Link>
        </>
    );
}

export default index;
