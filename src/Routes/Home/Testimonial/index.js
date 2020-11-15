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
                            pursue pleasure“They services where amazing. very
                            affordable and easy to use. I love gwillsub.
                        </p>
                        <p className={styles.testimonial}>
                            <span className={styles.name}>Qudusayo D.</span>
                            <br />
                            <span className={styles.title}>Developer</span>
                        </p>
                    </div>
                </Slide>
                <Slide right>
                    <div>
                        <p className={styles.testimony}>
                            A friend refer me to this website to start a small
                            business and since have join Isquaredata, they have
                            had never let me down for once. Am happy.
                        </p>
                        <p className={styles.testimonial}>
                            <span className={styles.name}>Alh Olasupo</span>
                            <br />
                            <span className={styles.title}>Chairman</span>
                        </p>
                    </div>
                </Slide>
                <Slide right>
                    <div>
                        <p className={styles.testimony}>
                            Customer care services is always available to
                            explain how things are done, Funding of wallet is
                            automated and easy to do.Services delivers intantly
                            to my customers. They have provided me all the best
                            i want. Thank you.
                        </p>
                        <p className={styles.testimonial}>
                            <span className={styles.name}>Tajudeen O.</span>
                            <br />
                            <span className={styles.title}>Member</span>
                        </p>
                    </div>
                </Slide>
            </Carousel>
        </div>
    );
}

export default index;
