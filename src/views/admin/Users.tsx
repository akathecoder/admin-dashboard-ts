import { Button, createMuiTheme, createStyles, makeStyles, ThemeProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/User/UserDataTable';
import { CollectionDataType, COLLECTION_ID, USER, userRoleTypes } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';
import { COLORS } from '../../assets/themes/colors';
import AddUserModal from '../../components/User/AddUserModal';
import { deleteUsers } from '../../utils/userFunctions';
import ModifyUserModal from '../../components/User/ModifyUserModal';
import { firebaseAuth } from '../../utils/firebase/firebase';
import { getUserRole } from '../../utils/generalFunctions';

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
    const [isModifyUserPanelOpen, setIsModifyUserPanelOpen] = useState(false);
    const [userRole, setUserRole] = useState<string>('');

    const user = firebaseAuth.currentUser;
    console.log(user);

    useEffect(() => {
        if (user) {
            getUserRole(user?.uid).then((data) => {
                setUserRole(data);
            });
        }
    }, [user]);

    useEffect(() => {
        getCollectionData(COLLECTION_ID.USER).then((data) => {
            console.log(data);
            setUsersData(data);
        });
    }, []);

    const deleteSelectedUsers = () => {
        deleteUsers(selectedUsers).then(() => {
            window.location.reload();
        });
    };

    console.log('users');
    console.log(selectedUsers);

    return (
        <div id="user-dashboard">
            {userRole === userRoleTypes.ADMIN && (
                <div className={classes.buttonWrapper}>
                    <ThemeProvider theme={redButtonTheme}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={selectedUsers.length === 0 ? true : false}
                            onClick={deleteSelectedUsers}
                        >
                            Delete users
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={yellowButtonTheme}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => setIsModifyUserPanelOpen(true)}
                            disabled={selectedUsers.length === 1 ? false : true}
                        >
                            Modify users
                        </Button>
                    </ThemeProvider>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => setIsAddUserPanelOpen(true)}
                        disabled={selectedUsers.length === 0 ? false : true}
                    >
                        Add users
                    </Button>
                </div>
            )}

            <div className={classes.tableWrapper}>
                <DataTable
                    dataBody={usersData as Array<USER>}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                />
            </div>

            <AddUserModal isOpen={isAddUserPanelOpen} setIsOpen={setIsAddUserPanelOpen} />
            <ModifyUserModal
                isOpen={isModifyUserPanelOpen}
                setIsOpen={setIsModifyUserPanelOpen}
                userId={selectedUsers[0]}
            />
        </div>
    );
};

export default Users;
