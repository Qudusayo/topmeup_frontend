import React, { Component } from "react";
import Wrapper from "./../../Components/Container";

// import spinner from "./../../assets/images/logos/loading.png";

import styles from "./../Transfer/style.module.scss";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: "45,000",
            reciever: "",
            amount: "",
            waiting: false,
        };
    }
    onChange() {}
    render() {
        return (
            <Wrapper>
                <div className={styles.card}>
                    <h4>Transaction History</h4>
                </div>
            </Wrapper>
        );
    }
}

export default index;
