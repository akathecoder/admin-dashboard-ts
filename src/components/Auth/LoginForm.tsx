import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { CardHeader, IconButton, Snackbar, TextField } from '@material-ui/core';
import { SignInWithEmailPassword } from '../../utils/firebase/auth';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
            padding: theme.spacing(5),
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },

        formRoot: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
        cardHeader: {
            display: 'flex',
            textAlign: 'center',
        },
        cardFooter: {
            display: 'flex',
            justifyContent: 'center',
        },
    }),
);

const LoginForm: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Incorrect Email or Password');

    const checkEmail = (email: string): boolean => {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailRegex.test(String(email).toLowerCase())) {
            return true;
        }
        return false;
    };

    const checkPassword = (password: string): boolean => {
        if (!password) {
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!checkEmail(email)) {
            setErrorMessage('Email Correct Email ID');
            setOpen(true);
            return;
        }

        if (!checkPassword(password)) {
            setErrorMessage('Email Correct Password');
            setOpen(true);
            return;
        }

        SignInWithEmailPassword(email, password).then((result) => {
            console.log(result);
            if (result) {
                history.push('/dashboard');
            } else {
                setErrorMessage('Incorrect Email or Password');
                setOpen(true);
            }
            setEmail('');
            setPassword('');
        });
    };

    return (
        <>
            <Card className={classes.root}>
                <CardHeader title="Sign in with credentials" className={classes.cardHeader} />

                <CardContent>
                    <form className={classes.formRoot} noValidate autoComplete="off">
                        <TextField
                            id="login-email"
                            label="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            helperText="Enter your Email ID"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText="Enter your Password"
                            variant="outlined"
                            fullWidth
                        />
                    </form>
                </CardContent>
                <CardActions className={classes.cardFooter}>
                    <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
                        Sign in
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                message={errorMessage}
                onClose={() => setOpen(false)}
                action={
                    <React.Fragment>
                        <IconButton size="medium" aria-label="close" color="secondary" onClick={() => setOpen(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
};

export default LoginForm;
