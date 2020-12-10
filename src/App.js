import React from "react";
import { Provider } from "react-redux";

import { Switch, Route } from "react-router-dom";

import Home from "./Routes/Home";
import Error from "./Routes/Error";
import Login from "./Routes/Forms/Login";
import SignUp from "./Routes/Forms/SignUp";
import ResetPin from "./Routes/Forms/ResetPin";
import ForgetPin from "./Routes/Forms/ForgetPin";

import Dashboard from "./Routes/Dashboard";
import Transfer from "./Routes/Transfer";
import Profile from "./Routes/Profile";
import Contact from "./Routes/Contact";
import Airtime from "./Routes/Airtime";
import Cash from "./Routes/Cash";
import Fund from "./Routes/Fund";
import Exam from "./Routes/Exam";
import CableTV from "./Routes/CableTV";
import Withdraw from "./Routes/Withdraw";
import History from "./Routes/History";
import BillPayment from "./Routes/BillPayment";
import DataSubscription from "./Routes/DataSubscription";

import store from './store'

function App(props) {
    return (
        <Provider store={store}>
            <Switch>
                <Route path="/" component={Home} exact></Route>
                <Route path="/login" component={Login} exact></Route>
                <Route path="/register" component={SignUp} exact></Route>
                <Route path="/reset-password" component={ResetPin} exact></Route>
                <Route
                    path="/forget-password"
                    component={ForgetPin}
                    exact
                ></Route>

                <Route path="/dashboard" component={Dashboard} exact></Route>
                <Route
                    path="/data-subscription"
                    component={DataSubscription}
                    exact
                ></Route>
                <Route path="/contact-form" component={Contact} exact></Route>
                <Route path="/user-profile" component={Profile} exact></Route>
                <Route path="/airtime-topup" component={Airtime} exact></Route>
                <Route path="/airtime-converter" component={Cash} exact></Route>
                <Route path="/fund-wallet" component={Fund} exact></Route>
                <Route path="/cable-TV" component={CableTV} exact></Route>
                <Route path="/withdraw" component={Withdraw} exact></Route>
                <Route path="/history" component={History} exact></Route>
                <Route path="/buy-scratch-card" component={Exam} exact></Route>
                <Route
                    path="/bill-payment"
                    component={BillPayment}
                    exact
                ></Route>
                <Route path="/transfer-fund" component={Transfer} exact></Route>

                <Route path="*" component={Error} exact></Route>
            </Switch>
        </Provider>
    );
}

export default App;
