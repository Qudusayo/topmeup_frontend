import React, { Component } from "react";

import styles from "./style.module.scss";

import location from "./../../../assets/images/logos/location.svg";
import mail from "./../../../assets/images/logos/mail.svg";
import phone from "./../../../assets/images/logos/phone.svg";

class index extends Component {
    render() {
        return (
            <>
                <div className={styles.Contacts}>
                    <div className={styles.Cards}>
                        <div className={styles.Card}>
                            <img src={location} alt="location" />
                            <h2>Location</h2>
                            <p>
                                No. 4 Ibunkunoluwa Street,<br/> Opposite Comm. pry. school,<br/> Tose, Moniya, Ibadan <br />
                                Oyo State, Nigeria.
                            </p>
                        </div>
                        <div className={styles.Card}>
                            <img src={phone} alt="phone" />
                            <h2>Phone</h2>
                            <p>
                                Phone: <span>+234 7016 4020 41</span>
                                <br />
                                Help: <span>+234 7042 4676 56</span>
                            </p>
                        </div>
                        <div className={styles.Card}>
                            <img src={mail} alt="mail" />
                            <h2>Email</h2>
                            <p>
                                <span>topmeup@gmail.com</span>
                                <br />
                                <span>info@topmeup.ml</span>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default index;
