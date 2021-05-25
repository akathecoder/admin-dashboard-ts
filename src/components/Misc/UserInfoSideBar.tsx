import { Avatar, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { firebaseAuth } from '../../utils/firebase/firebase';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '1rem',
            marginBottom: '1rem',
            marginRight: '1.2rem',
            marginLeft: '2rem',
            display: 'flex',
        },
        largeAvatar: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
        textRoot: {
            marginLeft: '1rem',
            marginTop: 'auto',
            marginBottom: 'auto',
        },
    }),
);

const UserInfoSideBar: React.FC = () => {
    const classes = useStyles();

    const user = firebaseAuth.currentUser;

    return (
        <div className={classes.root}>
            <Avatar alt={`${user?.displayName}`} src={`${user?.photoURL}`} className={classes.largeAvatar} />
            <div className={classes.textRoot}>
                <Typography variant="h6">{user?.displayName}</Typography>
                <Typography variant="caption">{user?.email}</Typography>
            </div>
        </div>
    );
};

export default UserInfoSideBar;
