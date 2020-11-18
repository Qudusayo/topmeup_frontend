import React, { useState } from "react";

import styles from "./style.module.scss";
import Sidebar from "./../Sidebar";
import Dashboard from "./Dashboard"

function Index(props) {
    const [visible, setVisibility] = useState(false);

    const setVisibilit = () => {
        setVisibility(!visible)
    }

    return (
        <div className={styles.container}>
            <Sidebar visible={visible} />
            <Dashboard  visible={visible} setVisibility={setVisibilit}/>
        </div>
    );
}

export default Index;
