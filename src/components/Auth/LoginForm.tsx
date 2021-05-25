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

    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        SignInWithEmailPassword(enteredEmail, enteredPassword).then((result) => {
            console.log(result);
            if (result) {
                history.push('/dashboard');
            } else {
                setOpen(true);
            }
            setEnteredEmail('');
            setEnteredPassword('');
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
                            value={enteredEmail}
                            onChange={(e) => setEnteredEmail(e.target.value)}
                            helperText="Enter your Email ID"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="password"
                            label="Password"
                            value={enteredPassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}
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
                message="Incorrect Email or Password"
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
