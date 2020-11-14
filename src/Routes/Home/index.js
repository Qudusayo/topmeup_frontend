import React from "react";
import styles from "./style.module.scss";

import logo1 from "./../../assets/images/logos/fast-dlivery.svg";
import logo2 from "./../../assets/images/logos/safe-payment.svg";
import logo3 from "./../../assets/images/logos/certified-adviser.svg";
import logo4 from "./../../assets/images/logos/internet.svg";
import logo5 from "./../../assets/images/logos/mobile.svg";
import logo6 from "./../../assets/images/logos/television.svg";
import logo7 from "./../../assets/images/logos/cash.svg";
import logo8 from "./../../assets/images/logos/electricity-bill.svg";
import logo9 from "./../../assets/images/logos/messages.svg";

import Banner from "./Banner";
import Card from "./Card";

function index() {
    return (
        <div className={styles.home}>
            <Banner />
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
                />
                <Card
                    styles="card30"
                    info="Your wallet is the safest means of transacting with your mobile airtime. Your funds in your wallet can be kept as long as you want and it’s secured."
                    src={logo2}
                    title="You're Safe"
                />
                <Card
                    styles="card30"
                    info="With our several years of experience and engineers, we have learnt in the past years to be able to fully optimize our platform for reliability and dependability.."
                    src={logo3}
                    title="We're Reliable"
                />
            </div>

            <div className={[styles.titles, "center"].join(" ")}>
                <h2>SERVICES WE RENDER</h2>
                <span>
                    We offer instant recharge of Airtime, Databundle, CableTV
                    (DStv, GOtv & Startimes), Electricity Bill Payemnt and so
                    much more.
                </span>
            </div>
            <div className={styles.cards}>
                <Card
                    styles="card30"
                    info="Sign up now and start enjoying extremely cheaper data plans to all networks in Nigeria."
                    src={logo4}
                    title="Data Bundle"
                />
                <Card
                    styles="card30"
                    info="Making online recharge cheap and easy to buy at all time of the day Oziseff Telecom Services.com.ng"
                    src={logo5}
                    title="Airtime Top-Up"
                />
                <Card
                    styles="card30"
                    info="Instant Activation of Cable subscription with favourable discount ."
                    src={logo6}
                    title="Cable/TV Subscription"
                />
            </div>
            <div className={styles.cards}>
                <Card
                    styles="card30"
                    info="We offer this service at a very cheap and attractive rate please contact the admin on 07016412041 to get current conversion rate."
                    src={logo7}
                    title="Airtime To Cash"
                />
                <Card
                    styles="card30"
                    info="Because we understand your needs, we have made bills and utilities payment more convenient."
                    src={logo8}
                    title="Utilities Payment"
                />
                <Card
                    styles="card30"
                    info="Send BulkSMS to any number for as low as just 1.5kobo per unit."
                    src={logo9}
                    title="Bulk Sms"
                />
            </div>
            <div className={[styles.titles, "center"].join(" ")}>
                <h2>OUR AFFORDABLE DATA PLAN</h2>
                <span>
                    Subscribe for cheap data plans at affordable price for all
                    network
                </span>
            </div>

            <div className={styles.cards}>
                <Card styles="card25" network="mtn">
                    <h1>MTN</h1>
                    {cardInfo("₦300 1GB")}
                </Card>
                <Card styles="card25" network="airtel">
                    <h1>AIRTEL</h1>
                    {cardInfo("₦920 1GB")}
                </Card>
                <Card styles="card25" network="glo">
                    <h1>GLO</h1>
                    {cardInfo("₦450 1GB")}
                </Card>
                <Card styles="card25" network="nmobile">
                    <h1>9MOBILE</h1>
                    {cardInfo("₦700 1.5GB")}
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

            <div className={[styles.titles, "center"].join(" ")}>
                <h2>TESTIMONIAL</h2>
                <span>See what our Customers are saying about us:</span>
            </div>
        </div>
    );
}

function cardInfo(value) {
    return (
        <>
            <p className={styles.line}><b>{value}</b></p>
            <p className={styles.line}><b>1 Months Validity</b></p>
            <p className={styles.line}><b>4G LTE Support</b></p>
            <p className={styles.line}><b>Hotspot Sharing Support</b></p>
            <p className={styles.line}><b>Laptop Usage Support</b></p>
            <p className={styles.line}><b>iphones Usage Support</b></p>
            <p className={styles.line}><b>Multiple Devices Support</b></p>
            <button className={styles.button}>PURCHASE NOW</button>
        </>
    );
}

export default index;
