import React from "react";
import { NavLink } from "react-router-dom";

import avatar from "./../../assets/images/av2.png";

import styles from "./style.module.scss";

function index(props) {
    return (
        <div
            className={[
                styles.sidebar,
                props.visible ? styles.visibleNav : styles.inVisibleNav,
            ].join(" ")}
        >
            <nav>
                <ul>
                    <li className={styles.preview}>
                        <img src={avatar} alt="avatar" />
                        <div>
                            <h4>Qudusayo</h4>
                            <p>₦ 45,000</p>
                        </div>
                    </li>
                    <NavLink
                        to="/user-profile"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>USER PROFILE</li>
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>DASHBOARD</li>
                    </NavLink>
                    <NavLink
                        to="/fund-wallet"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>FUND WALLET</li>
                    </NavLink>

                    <NavLink
                        to="/airtime-topup"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>AIRTIME TOP-UP</li>
                    </NavLink>
                    <NavLink
                        to="/data-subscription"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>BUY DATA BUNDLE</li>
                    </NavLink>
                    <NavLink
                        to="/buy-scratch-card"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>EXAM CARD</li>
                    </NavLink>
                    <NavLink
                        to="/bill-payment"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>ELECTRICITY BILL</li>
                    </NavLink>
                    <NavLink
                        to="/cable-TV"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>TV/CABLE PAYMENT</li>
                    </NavLink>
                    <NavLink
                        to="/airtime-converter"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>AIRTIME TO CASH</li>
                    </NavLink>
                    <NavLink
                        to="/transfer-fund"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>TRANSFER FUND</li>
                    </NavLink>
                    <NavLink
                        to="/withdraw"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>WITHDRAW FUND</li>
                    </NavLink>
                    <NavLink
                        to="/contact-form"
                        exact
                        activeClassName={styles.active}
                    >
                        <li>CONTACT FORM</li>
                    </NavLink>
                    <NavLink to="/history" exact activeClassName={styles.active}>
                        <li>TRANSACTION HISTORY</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>SETTINGS</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>LOGOUT</li>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
}

export default index;
