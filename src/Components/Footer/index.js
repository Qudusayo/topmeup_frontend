import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./style.module.scss";

import instagram from "./../../assets/images/logos/instagram.svg";
import facebook from "./../../assets/images/logos/facebook.svg";
import twitter from "./../../assets/images/logos/twitter.svg";

function Index() {
    return (
        <div className={styles.footer}>
            <div className={styles.flex}>
                <div className={styles.info}>
                    <h2>TOPE<span className="yellow">ME</span>UP</h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi quia voluptates officiis repudiandae nesciunt sed
                    fugit.
                </div>
                <div className={styles.table}>
                    <h2>Opening Hours</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.disabled}>Mo: </td>
                                <td> 08:00 - 05:00</td>
                            </tr>
                            <tr>
                                <td className={styles.disabled}>Tu: </td>
                                <td> 08:00 - 05:00</td>
                            </tr>
                            <tr>
                                <td className={styles.disabled}>We: </td>
                                <td> 08:00 - 05:00</td>
                            </tr>
                            <tr>
                                <td className={styles.disabled}>Th: </td>
                                <td> 08:00 - 05:00</td>
                            </tr>
                            <tr>
                                <td className={styles.disabled}>Fr: </td>
                                <td> 08:00 - 05:00</td>
                            </tr>
                            <tr>
                                <td className={styles.disabled}>Sa: </td>
                                <td> 09:00 - 03:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.pages}>
                    <h2>Services</h2>
                    <ul>
                        <li>
                            <NavLink to="/" exact activeClassName={styles.active}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" activeClassName={styles.active}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" activeClassName={styles.active}>
                                Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/oprations" activeClassName={styles.active}>
                                Operations
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/orgonogram" activeClassName={styles.active}>
                                Organogram
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contacts" activeClassName={styles.active}>
                                Contacts
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={styles.address}>
                    <h2>Contacts</h2>
                    <div className={styles.par}>
                        <h2>Ibadan</h2>
                        <p>
                            Al-amin Plaza, Opposite HLA primary school, Ojoo
                            Market,
                            <br />
                            Oyo State, Nigeria.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <span className={styles.copyright}>
                    <small>© Copyright 2020. All rights reserved</small>
                </span>
                <br />
                <img src={facebook} className={styles.logo} alt="facebook-logo" />
                <img src={twitter} className={styles.logo} alt="twitter-logo" />
                <img src={instagram} className={styles.logo} alt="instagram-logo" />
            </div>
        </div>
    );
}

export default Index;
