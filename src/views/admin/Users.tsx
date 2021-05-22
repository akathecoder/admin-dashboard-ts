import { Button, createMuiTheme, createStyles, makeStyles, ThemeProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../../assets/themes/variables';
import DataTable from '../../components/User/UserDataTable';
import { CollectionDataType, COLLECTION_ID, USER } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';
import { COLORS } from '../../assets/themes/colors';
import AddUserModal from '../../components/User/AddUserModal';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
        },
        buttonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
        },
        tableWrapper: {
            marginTop: '1rem',
            marginBottom: '1rem',
        },
    }),
);

const redButtonTheme = createMuiTheme({
    palette: {
        primary: {
            main: COLORS.Red,
            contrastText: COLORS.White,
        },
    },
});

const yellowButtonTheme = createMuiTheme({
    palette: {
        primary: {
            main: COLORS.Yellow,
            contrastText: COLORS.White,
        },
    },
});

const Users: React.FC = () => {
    const classes = useStyles();

    const [usersData, setUsersData] = useState<CollectionDataType>([]);
    const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
    const [isAddUserPanelOpen, setIsAddUserPanelOpen] = useState(false);

    useEffect(() => {
        getCollectionData(FIREBASE_FIRESTORE_PROJECT_ID, COLLECTION_ID.USER).then((data) => {
            console.log(data);
            setUsersData(data);
        });
    }, []);

    console.log('users');
    console.log(selectedUsers);

    return (
        <div id="user-dashboard">
            <div className={classes.buttonWrapper}>
                <ThemeProvider theme={redButtonTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={selectedUsers.length === 0 ? true : false}
                    >
                        Delete users
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={yellowButtonTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={selectedUsers.length === 0 ? true : false}
                    >
                        Modify users
                    </Button>
                </ThemeProvider>
                <Button variant="contained" color="primary" size="large" onClick={() => setIsAddUserPanelOpen(true)}>
                    Add users
                </Button>
            </div>

            <div className={classes.tableWrapper}>
                <DataTable
                    dataBody={usersData as Array<USER>}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                />
            </div>

            <AddUserModal isOpen={isAddUserPanelOpen} setIsOpen={setIsAddUserPanelOpen} />
        </div>
    );
};

export default Users;
