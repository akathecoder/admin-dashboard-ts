import React, { useState } from 'react';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import AppBar from '../components/Appbar';
import { sideBarIndexes } from '../assets/themes/variables';
import Articles from '../views/admin/Articles';
import Dashboard from '../views/admin/Dashboard';
import Users from '../views/admin/Users';
import Feedback from '../views/admin/Feedback';
import Members from '../views/admin/Members';
import Report from '../views/admin/Report';
import Settings from '../views/admin/Settings';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

const DashboardLayout: React.FC = () => {
    const classes = useStyles();

    const [selectedBoxId, setSelectedBoxId] = useState<sideBarIndexes>(sideBarIndexes.Users);

    const getSelectedBox = () => {
        switch (selectedBoxId) {
            case sideBarIndexes.Articles:
                return <Articles />;
                break;
            case sideBarIndexes.Dashboard:
                return <Dashboard />;
                break;
            case sideBarIndexes.Feedback:
                return <Feedback />;
                break;
            case sideBarIndexes.Members:
                return <Members />;
                break;
            case sideBarIndexes.Report:
                return <Report />;
                break;
            case sideBarIndexes.Settings:
                return <Settings />;
                break;
            case sideBarIndexes.Users:
                return <Users />;
                break;

            default:
                return <Dashboard />;
                break;
        }
    };

    return (
        <div className={classes.root}>
            <Sidebar selectedDrawerListItem={selectedBoxId} setSelectedDrawerListItem={setSelectedBoxId} />
            <Box className={classes.content}>
                <AppBar />
                <div className={classes.toolbar} />
                {getSelectedBox()}
            </Box>
        </div>
    );
};

export default DashboardLayout;
