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
import { sideBarIndexes, variables } from '../assets/themes/variables';
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: variables.drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: variables.drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerToolbar: {
            display: 'table',
            paddingLeft: '2rem',
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
            marginRight: '1.2rem',
            marginLeft: '1rem',
            color: 'inherit',
        },
        selected: {
            color: COLORS.AccentBlue,
            backgroundColor: 'none',
        },
    }),
);

type SidebarProps = {
    selectedDrawerListItem: sideBarIndexes;
    setSelectedDrawerListItem: (selectedDrawerListItem: sideBarIndexes) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ selectedDrawerListItem, setSelectedDrawerListItem }: SidebarProps) => {
    const classes = useStyles();

    type drawerItemType = {
        id: sideBarIndexes;
        name: string;
        icon: SvgIconProps;
    };

    const DrawerItems: Array<drawerItemType> = [
        {
            id: sideBarIndexes.Dashboard,
            name: 'Dashboard',
            icon: <DashboardOutlined />,
        },
        {
            id: sideBarIndexes.Users,
            name: 'Users',
            icon: <PermIdentityOutlined />,
        },
        {
            id: sideBarIndexes.Members,
            name: 'Members',
            icon: <PeopleAltOutlined />,
        },
        {
            id: sideBarIndexes.Articles,
            name: 'Articles',
            icon: <ViewWeekOutlined />,
        },
        {
            id: sideBarIndexes.Feedback,
            name: 'Feedback',
            icon: <ChatBubbleOutlineOutlined />,
        },
        {
            id: sideBarIndexes.Report,
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
                    <ListItem
                        button
                        key={item.name}
                        onClick={() => setSelectedDrawerListItem(item.id)}
                        selected={item.id === selectedDrawerListItem}
                        classes={{
                            selected: classes.selected,
                        }}
                    >
                        <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} key={index} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List className={classes.drawerList}>
                <ListItem
                    button
                    onClick={() => setSelectedDrawerListItem(sideBarIndexes.Settings)}
                    selected={sideBarIndexes.Settings === selectedDrawerListItem}
                    classes={{
                        selected: classes.selected,
                    }}
                >
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
