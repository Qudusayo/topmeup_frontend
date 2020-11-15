import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import styles from "./style.module.scss";

function Index(props) {
    const [visible, setVisibility] = useState(false);

    return (
        <div className={styles.MainNav}>
            <h2>
                <Link to="/">TOP<span className={styles.yellow}>ME</span>UP</Link>
            </h2>
            <ul className={visible ? styles.visibleNav : styles.inVisibleNav}>
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
                    <NavLink to="/login" activeClassName={styles.active}>
                        Login
                    </NavLink>
                </li>
            </ul>
            <button>Join Us</button>
            <div className={styles.hamburger}>
                <input
                    type="checkbox"
                    tabIndex="-1"
                    id="checkbox"
                    className={styles.hamburger_check}
                    defaultChecked={visible}
                    onChange={() => setVisibility(!visible)}
                />
                <label htmlFor="checkbox">
                    <span className={styles.hamburger_bars}></span>
                    <span className={styles.hamburger_bars}></span>
                    <span className={styles.hamburger_bars}></span>
                </label>
            </div>
        </div>
    );
}

export default Index;
