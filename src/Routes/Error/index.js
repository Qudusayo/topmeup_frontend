import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./../../Components/Navbar";
import Footer from "./../../Components/Footer";

import styles from "./styles.module.scss"

function index() {
    return (
        <>
        <Navbar />
        <div id={styles.notfound}>
            <div className={styles.notfound}>
                <div className={styles.notfound404}></div>
                <h1>404</h1>
                <h2>Oops! Page Not Be Found</h2>
                <p>
                    Sorry but the page you are looking for does not exist, have
                    been removed. name changed or is temporarily unavailable
                </p>
                <Link to="/">Back to homepage</Link>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default index;
