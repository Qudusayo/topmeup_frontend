import React from "react";
import "animate.css/animate.min.css";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

function index() {
    return (
        <div className={styles.banner}>
            {/* <h1
                className={[
                    styles.bg,
                    "animate__animated",
                    "animate__fadeInUp",
                ].join(" ")}
            >
                TOP UP LAB
            </h1> */}
            <div className={styles.content}>
                <h1 className="animate__animated animate__bounce">
                    TOP<span className="yellow">UP</span> anytime anywhere
                </h1>
                <div className={styles.flex}>
                    <Link to="/register">
                        <button className="animate__animated animate__bounceInUp">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default index;
