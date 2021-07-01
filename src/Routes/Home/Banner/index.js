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
                    The automated way for VTU Services
                </h1>
                <small>
                    Make VTU services quick with TopUpLab that is automated with instant delivery.
                </small>
                <div className={styles.flex}>
                    <Link to="/login">
                        <button className="animate__animated animate__bounceInUp">
                            Sign In to account Now!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default index;
