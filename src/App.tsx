import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" exact={true}>
                    <DashboardLayout />
                </Route>
                <Route path="/login" exact={true}>
                    <AuthLayout />
                </Route>
                <Redirect from="/" to="/login" />
                <Route />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
