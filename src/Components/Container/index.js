import React, { Component } from "react";
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom'

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { revokeUser } from "./../../actions/usersAction";
import styles from "./style.module.scss";
import Sidebar from "./../Sidebar";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            userName: "User",
        };
    }

    componentDidMount() {
        // const data = JSON.parse(sessionStorage.getItem("topuplab"));
        // return setUserName(data.userName);
        if (!Cookies.get('_lab__topup')) {
            this.props.history.push("/login");
        }
        this.setState({ userName: this.props.userInfo.userName })
    }

    render() {
        return (
            <div className={styles.container}>
                <Sidebar visible={this.state.visible} />
                <div className={styles.dashboard}>
                    <nav>
                        <div className={styles.hamburger}>
                            <input
                                type="checkbox"
                                tabIndex="-1"
                                id="checkbox"
                                className={styles.hamburger_check}
                                defaultChecked={this.state.visible}
                                onChange={() =>
                                    this.setState({
                                        visible: !this.state.visible,
                                    })
                                }
                            />
                            <label htmlFor="checkbox">
                                <span className={styles.hamburger_bars}></span>
                                <span className={styles.hamburger_bars}></span>
                                <span className={styles.hamburger_bars}></span>
                            </label>
                        </div>
                        <h2>WELCOME {this.state.userName.toUpperCase()}</h2>
                    </nav>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    auth: PropTypes.bool.isRequired,
    userInfo: PropTypes.object.isRequired,
    revokeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.user.auth,
    userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, { revokeUser })(withRouter(Index));
