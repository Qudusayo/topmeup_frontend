import React from "react";
import { NavLink, Link } from "react-router-dom";

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
                    <NavLink to="/dashboard" exact activeClassName={styles.active}>
                        <li>DASHBOARD</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>FUND WALLET</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>USER PROFILE</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>AIRTIME TOP-UP</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>BUY DATA BUNDLE</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>EXAM CARD</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>ELECTRICITY BILL</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>TV/CABLE PAYMENT</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>AIRTIME TO CASH</li>
                    </NavLink>
                    <NavLink to="/transfer-fund" exact activeClassName={styles.active}>
                        <li>TRANSFER FUND</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>WITHDRAW FUND</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
                        <li>CONTACT FORM</li>
                    </NavLink>
                    <NavLink to="/" exact activeClassName={styles.active}>
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
