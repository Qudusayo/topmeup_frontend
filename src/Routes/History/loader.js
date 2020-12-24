import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "./../Transfer/style.module.scss";

function index() {
    return (
        <SkeletonTheme color="#127EB1" highlightColor="#3A6EA5">
            <div className={[styles.card, styles.loose].join(" ")}>
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0", flex: "3" }}>
                        <Skeleton height="1.1em" width="55%" />
                    </p>
                    <p style={{ margin: "0", flex: "1.8" }}>
                        <Skeleton height="1.1em" width="100%" />
                    </p>
                </div>
                <h2>
                    <Skeleton height="1.1em" width="20%" />
                </h2>
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0", flex: "3" }}>
                        <Skeleton height="1.1em" width="55%" />
                    </p>
                    <p style={{ margin: "0", flex: "1.8" }}>
                        <Skeleton height="1.1em" width="100%" />
                    </p>
                </div>
            </div>
            <div className={[styles.card, styles.loose].join(" ")}>
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0", flex: "3" }}>
                        <Skeleton height="1.1em" width="55%" />
                    </p>
                    <p style={{ margin: "0", flex: "1.8" }}>
                        <Skeleton height="1.1em" width="100%" />
                    </p>
                </div>
                <h2>
                    <Skeleton height="1.1em" width="20%" />
                </h2>
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0", flex: "3" }}>
                        <Skeleton height="1.1em" width="55%" />
                    </p>
                    <p style={{ margin: "0", flex: "1.8" }}>
                        <Skeleton height="1.1em" width="100%" />
                    </p>
                </div>
            </div>
            <div className={[styles.card, styles.loose].join(" ")}>
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0", flex: "3" }}>
                        <Skeleton height="1.1em" width="55%" />
                    </p>
                    <p style={{ margin: "0", flex: "1.8" }}>
                        <Skeleton height="1.1em" width="100%" />
                    </p>
                </div>
                <h2>
                    <Skeleton height="1.1em" width="20%" />
                </h2>
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0", flex: "3" }}>
                        <Skeleton height="1.1em" width="55%" />
                    </p>
                    <p style={{ margin: "0", flex: "1.8" }}>
                        <Skeleton height="1.1em" width="100%" />
                    </p>
                </div>
            </div>
        </SkeletonTheme>
    );
}

export default index;
