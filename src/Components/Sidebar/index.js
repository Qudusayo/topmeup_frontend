import React from 'react'

import styles from "./style.module.scss";

function index() {
    return (
        <div className={styles.sidebar}>
            <nav>
                <ul>
                    <li>DASHBOARD</li>
                    <li>FUND WALLET</li>
                    <li>USER PROFILE</li>
                    <li>AIRTIME TOP-UP</li>
                    <li>BUY DATA BUNDLE</li>
                    <li>EXAM CARD</li>
                    <li>ELECTRICITY BILL</li>
                    <li>TV/CABLE PAYMENT</li>
                    <li>AIRTIME TO CASH</li>
                    <li>TRANSFER FUND</li>
                    <li>WITHDRAW FUND</li>
                    <li>CONTACT FORM</li>
                    <li>TRANSACTION HISTORY</li>
                    <li>SETTINGS</li>
                    <li>LOGOUT</li>
                </ul>
            </nav>
        </div>
    )
}

export default index
