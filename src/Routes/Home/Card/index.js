import React, { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import styles from "./style.module.scss";

function Index(props) {
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: "ease",
            once: true,
        });
    }, []);

    return (
        <div
            className={[
                styles.card,
                styles[props.styles],
                styles[props.network],
            ].join(" ")}
            data-aos={props.anim}
            data-aos-delay={props.delay}
        >
            {props.src ? <img alt="symbol" src={props.src} /> : null}
            <h4>{props.title}</h4>
            <p>{props.info}</p>
            {props.children}
        </div>
    );
}

export default Index;
