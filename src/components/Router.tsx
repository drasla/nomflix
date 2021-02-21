import React from "react";
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "components/Header";
import { Movie } from "Routes/Movie";
import {TV} from "../Routes/TV";
import {Search} from "../Routes/Search";
import {Detail} from "Routes/Detail";

const Router = () => (
    <BrowserRouter>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Movie} />
                <Route path="/tv" exact component={TV} />
                <Route path="/search" exact component={Search} />
                <Route path="/movie/:id" component={Detail} />
                <Route path="/show/:id" component={Detail} />
                <Redirect from="*" to="/" />
            </Switch>
    </>
    </BrowserRouter>
);

export default Router;