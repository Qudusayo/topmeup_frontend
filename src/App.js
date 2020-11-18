import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Routes/Home";
import Error from "./Routes/Error";
import Login from "./Routes/Forms/Login";
import SignUp from "./Routes/Forms/SignUp";
import ForgetPin from "./Routes/Forms/ForgetPin";

import Dashboard from "./Routes/Dashboard";
import Transfer from "./Routes/Transfer";
import Contact from "./Routes/Contact";
import Airtime from "./Routes/Airtime";
import Cash from "./Routes/Cash";
import CableTV from "./Routes/CableTV";
import DataSubscription from "./Routes/DataSubscription";

function App(props) {
    return (
        <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/register" component={SignUp} exact></Route>
            <Route path="/forget-password" component={ForgetPin} exact></Route>

            <Route path="/dashboard" component={Dashboard} exact></Route>
            <Route
                path="/data-subscription"
                component={DataSubscription}
                exact
            ></Route>
            <Route path="/contact-form" component={Contact} exact></Route>
            <Route path="/airtime-topup" component={Airtime} exact></Route>
            <Route path="/airtime-converter" component={Cash} exact></Route>
            <Route path="/cable-TV" component={CableTV} exact></Route>
            <Route path="/transfer-fund" component={Transfer} exact></Route>

            <Route path="*" component={Error} exact></Route>
        </Switch>
    );
}

export default App;
