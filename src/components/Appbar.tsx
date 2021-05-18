import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    appBarColor: {
        background: 'white',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    },
    label: {
        textTransform: 'capitalize',
    },
});

const Appbar: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            color="primary"
            elevation={1}
            classes={{
                colorPrimary: classes.appBarColor,
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Admin Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
