import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, SvgIconProps } from '@material-ui/core';
import { variables } from '../assets/themes/variables';
import {
    PermIdentityOutlined,
    PeopleAltOutlined,
    DashboardOutlined,
    ChatBubbleOutlineOutlined,
    ViewWeekOutlined,
    MailOutlineOutlined,
    MoreHorizOutlined,
} from '@material-ui/icons';

const drawerWidth = variables.drawerWidth;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerTitle: {
            textAlign: 'center',
        },
    }),
);
export const Sidebar: React.FC = () => {
    const classes = useStyles();

    type drawerItemType = {
        name: string;
        icon: SvgIconProps;
    };

    const DrawerItems: Array<drawerItemType> = [
        {
            name: 'Dashboard',
            icon: <DashboardOutlined />,
        },
        {
            name: 'Users',
            icon: <PermIdentityOutlined />,
        },
        {
            name: 'Members',
            icon: <PeopleAltOutlined />,
        },
        {
            name: 'Articles',
            icon: <ViewWeekOutlined />,
        },
        {
            name: 'Feedback',
            icon: <ChatBubbleOutlineOutlined />,
        },
        {
            name: 'Report',
            icon: <MailOutlineOutlined />,
        },
    ];

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar}>
                <div className={classes.drawerTitle}>Admin Dashboard</div>
            </div>
            <Divider />
            <List>
                {DrawerItems.map((item, index) => (
                    <ListItem button key={item.name}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} key={index} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <ListItem button>
                <ListItemIcon>
                    <MoreHorizOutlined />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
        </Drawer>
    );
};
