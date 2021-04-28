import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import avatar from "./../../assets/images/av2.png";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./style.module.scss";

import dashboard from "./../../assets/icons/dashboard.svg";
import account from "./../../assets/icons/user.svg";
import cash from "./../../assets/icons/cash.svg";
import phone from "./../../assets/icons/phone.svg";
import contact from "./../../assets/icons/contact.svg";
import tv from "./../../assets/icons/tv.svg";
import result from "./../../assets/icons/result.svg";
import electricity from "./../../assets/icons/electricity.svg";
import internet from "./../../assets/icons/internet.svg";
import transfer from "./../../assets/icons/transfer.svg";
import atm from "./../../assets/icons/atm.svg";
import card from "./../../assets/icons/card.svg";
import transaction from "./../../assets/icons/transaction.svg";
import logout from "./../../assets/icons/logout.svg";

class Index extends Component {
  logout() {
    sessionStorage.removeItem("topuplab");
  }

  render() {
    return (
      <div
        className={[
          styles.sidebar,
          this.props.visible ? styles.visibleNav : styles.inVisibleNav,
        ].join(" ")}
      >
        <nav>
          <ul>
            <li className={styles.preview}>
              <img src={avatar} alt="avatar" />
              <div>
                <h4>{this.props.userInfo.userName.toUpperCase()}</h4>
                <p
                  style={{
                    textAlign: "center",
                    backgroundColor: "#001A23",
                    borderRadius: "25px",
                    color: "#FFFFFF",
                    fontWeight: ".5em",
                  }}
                >
                  {this.props.userInfo.accountType
                    ? this.props.userInfo.accountType.toUpperCase()
                    : null}
                </p>
              </div>
            </li>
            <NavLink to="/user-profile" exact activeClassName={styles.active}>
              <li>
                <img src={account} alt="zero" width="30" />
                USER PROFILE
              </li>
            </NavLink>
            <NavLink to="/dashboard" exact activeClassName={styles.active}>
              <li>
                <img src={dashboard} alt="zero" width="30" />
                DASHBOARD
              </li>
            </NavLink>
            <NavLink to="/fund-wallet" exact activeClassName={styles.active}>
              <li>
                <img src={card} alt="zero" width="30" />
                FUND WALLET
              </li>
            </NavLink>

            <NavLink to="/airtime-topup" exact activeClassName={styles.active}>
              <li>
                <img src={phone} alt="zero" width="30" />
                AIRTIME TOP-UP
              </li>
            </NavLink>
            <NavLink
              to="/data-subscription"
              exact
              activeClassName={styles.active}
            >
              <li>
                <img src={internet} alt="zero" width="30" />
                BUY DATA BUNDLE
              </li>
            </NavLink>
            <NavLink
              to="/buy-scratch-card"
              exact
              activeClassName={styles.active}
            >
              <li>
                <img src={result} alt="zero" width="30" />
                EXAM CARD <small> ( coming soon ) </small>
              </li>
            </NavLink>
            <NavLink to="/bill-payment" exact activeClassName={styles.active}>
              <li>
                <img src={electricity} alt="zero" width="30" />
                ELECTRICITY BILL
              </li>
            </NavLink>
            <NavLink to="/cable-TV" exact activeClassName={styles.active}>
              <li>
                <img src={tv} alt="zero" width="30" />
                TV/CABLE PAYMENT
              </li>
            </NavLink>
            <NavLink
              to="/airtime-converter"
              exact
              activeClassName={styles.active}
            >
              <li>
                <img src={cash} alt="zero" width="30" />
                AIRTIME TO CASH
              </li>
            </NavLink>
            <NavLink to="/transfer-fund" exact activeClassName={styles.active}>
              <li>
                <img src={transfer} alt="zero" width="30" />
                TRANSFER FUND
              </li>
            </NavLink>
            <NavLink to="/withdraw" exact activeClassName={styles.active}>
              <li>
                <img src={atm} alt="zero" width="30" />
                WITHDRAW <small> ( coming soon ) </small>
              </li>
            </NavLink>
            <NavLink to="/contact-form" exact activeClassName={styles.active}>
              <li>
                <img src={contact} alt="zero" width="30" />
                CONTACT FORM
              </li>
            </NavLink>
            <NavLink to="/history" exact activeClassName={styles.active}>
              <li>
                <img src={transaction} alt="zero" width="30" />
                TRANSACTIONS
              </li>
            </NavLink>
            <NavLink
              to="/login"
              exact
              activeClassName={styles.active}
              onClick={this.logout}
            >
              <li>
                <img src={logout} alt="zero" width="30" />
                LOGOUT
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  }
}

Index.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, {})(withRouter(Index));
