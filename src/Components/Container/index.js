import React, { useState } from "react";

import styles from "./style.module.scss";
import Sidebar from "./../Sidebar";

function Index(props) {
    const [visible, setVisibility] = useState(false);

    return (
        <div className={styles.container}>
            <Sidebar visible={visible} />
            <div className={styles.dashboard}>
                <nav>
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
                    <h2>WELCOME QUDUSAYO</h2>
                </nav>
                {props.children}
            </div>
        </div>
    );
}

export default Index;
