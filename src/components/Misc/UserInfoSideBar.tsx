import { Avatar, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
// import { firebaseAuth } from '../../utils/firebase/firebase';

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
            width: theme.spacing(7),
            height: theme.spacing(7),
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

    // console.log(firebaseAuth.currentUser);

    return (
        <div className={classes.root}>
            <Avatar
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                className={classes.largeAvatar}
            />
            <div className={classes.textRoot}>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="caption">john.doe@email.com</Typography>
            </div>
        </div>
    );
};

export default UserInfoSideBar;
