import React from "react";

import styles from "./style.module.scss";
import Sidebar from "./../Sidebar";

function index(props) {
    return (
        <div className={styles.container}>
            <Sidebar />
            {props.children}
        </div>
    );
}

export default index;
