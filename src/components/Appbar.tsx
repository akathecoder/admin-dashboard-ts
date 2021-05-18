import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const Appbar: React.FC = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Admin Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
