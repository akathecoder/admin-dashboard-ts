import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SvgIconProps,
    Typography,
} from '@material-ui/core';
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
import { COLORS } from '../assets/themes/colors';

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
        drawerToolbar: {
            display: 'table',
            paddingLeft: '1rem',
        },
        drawerTitle: {
            textAlign: 'left',
            verticalAlign: 'middle',
            display: 'table-cell',
            fontWeight: 500,
            color: COLORS.AccentBlue,
        },
        drawerList: {
            marginTop: '1rem',
            marginBottom: '1rem',
        },
        icon: {
            minWidth: 'unset',
            marginRight: '1rem',
        },
    }),
);
const Sidebar: React.FC = () => {
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
            PaperProps={{ variant: 'elevation', elevation: 16 }}
        >
            <div className={`${classes.toolbar} ${classes.drawerToolbar}`}>
                <Typography variant="h6" noWrap className={classes.drawerTitle}>
                    Admin Dashboard
                </Typography>
            </div>
            <Divider />
            <List className={classes.drawerList}>
                {DrawerItems.map((item, index) => (
                    <ListItem button key={item.name}>
                        <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} key={index} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List className={classes.drawerList}>
                <ListItem button>
                    <ListItemIcon className={classes.icon}>
                        <MoreHorizOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
