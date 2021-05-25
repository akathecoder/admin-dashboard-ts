import { createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../assets/themes/colors';
import LoginForm from '../components/Auth/LoginForm';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: 0,
            background: 'linear-gradient(158deg, #109CF1 47%, white 25%)',
            height: '100vh',
        },
        headingRoot: {
            padding: '2rem',
            marginLeft: '3rem',
        },
        headingH4: {
            fontWeight: 600,
            color: COLORS.White,
        },
        loginFormRoot: {
            width: '40rem',
            height: '30rem',
            position: 'fixed',
            display: 'inline-block',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            margin: 'auto',
        },
    }),
);

const AuthLayout: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.headingRoot}>
                <Typography
                    variant="h4"
                    classes={{
                        h4: classes.headingH4,
                    }}
                >
                    Admin Dashboard
                </Typography>
            </div>
            <div className={classes.loginFormRoot}>
                <LoginForm />
            </div>
        </div>
    );
};

export default AuthLayout;
