import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './assets/themes/muiTheme';

const App: React.FC = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
            </ThemeProvider>
        </>
    );
};

export default App;
