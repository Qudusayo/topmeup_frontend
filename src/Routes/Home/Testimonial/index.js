import React from "react";
import Slide from "react-reveal/Slide";
import makeCarousel from "react-reveal/makeCarousel";

import styles from "./style.module.scss";

const CarouselUI = ({ position, total, handleClick, children }) => (
    <div className={styles.Container}>
        <div className={styles.Children}>{children}</div>
        <div className={styles.Dots}>
            {Array(...Array(total)).map((val, index) => (
                <span
                    className={styles.Dot}
                    key={index}
                    onClick={handleClick}
                    data-position={index}
                >
                    {index === position ? "● " : "○ "}
                </span>
            ))}
        </div>
    </div>
);
const Carousel = makeCarousel(CarouselUI);

function index() {
    return (
        <div className={styles.Testimonial}>
            <Carousel>
                <Slide right>
                    <div>
                        <p className={styles.testimony}>
                            The master-builder of human happines no one rejects,
                            dislikes avoids pleasure itself, because it is very
                            pursue pleasure. Their services are amazing, very
                            affordable and easy to use. I love TopUpLab.
                        </p>
                        <p className={styles.testimonial}>
                            <span className={styles.name}>Babalola Lateef.</span>
                            <br />
                            <span className={styles.title}>Gift Card Trader</span>
                        </p>
                    </div>
                </Slide>
                <Slide right>
                    <div>
                        <p className={styles.testimony}>
                            A friend referred me to this website to start a small
                            business and since I have joined TopUpLab, they have
                            had never let me down for once. Am happy.
                        </p>
                        <p className={styles.testimonial}>
                            <span className={styles.name}>Temitope Bolaji</span>
                            <br />
                            <span className={styles.title}>Local Trader</span>
                        </p>
                    </div>
                </Slide>
                <Slide right>
                    <div>
                        <p className={styles.testimony}>
                            Customer care services is always available to
                            explain how things are done, Funding of wallet is
                            automated and easy to do. Services deliver intantly
                            to my customers. They have provided me all the best
                            i want. Thank you.
                        </p>
                        <p className={styles.testimonial}>
                            <span className={styles.name}>Ilaka Bisi O.</span>
                            <br />
                            <span className={styles.title}>VTU Retailer</span>
                        </p>
                    </div>
                </Slide>
            </Carousel>
        </div>
    );
}

export default index;
