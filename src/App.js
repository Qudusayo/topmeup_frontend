import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Routes/Home";
import Login from "./Routes/Login";

function App(props) {
    return (
        <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/login" component={Login} exact></Route>
        </Switch>
    );
}

export default App;
