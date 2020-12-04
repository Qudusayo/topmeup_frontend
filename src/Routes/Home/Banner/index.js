import React from "react";
import "animate.css/animate.min.css";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

function index() {
    return (
        <div className={styles.banner}>
            <h1
                className={[
                    styles.bg,
                    "animate__animated",
                    "animate__fadeInUp",
                ].join(" ")}
            >
                TOP ME UP
            </h1>
            <div className={styles.content}>
                <small>We are to top you up</small>
                <h1 className="animate__animated animate__bounce">
                    TOP<span className="yellow">ME</span>UP anytime anywhere
                </h1>
                <small>
                    Buy cheap and affordable plans easily and cable
                    subscriptions
                </small>
                <div className={styles.flex}>
                    <Link to="/register">
                        <button className="animate__animated animate__bounceInUp">
                            Register Now !
                        </button>
                    </Link>
                    <Link to="/login" className={styles.left}>
                        <button className="animate__animated animate__bounceInUp">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default index;
