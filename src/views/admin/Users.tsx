import { Button, createStyles, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../../assets/themes/variables';
import DataTable from '../../components/UserDataTable';
import { CollectionDataType, COLLECTION_ID, DocumentDataType, USER, userRoleTypes } from '../../models/firestoreModel';
import { getCollectionData, setDocumentData } from '../../utils/firebase/firestore';
import firebase from 'firebase/app';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
        },
        buttonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        tableWrapper: {
            marginTop: '1rem',
            marginBottom: '1rem',
        },
    }),
);

const Users: React.FC = () => {
    const classes = useStyles();

    const [usersData, setUsersData] = useState<CollectionDataType>([]);

    useEffect(() => {
        getCollectionData(FIREBASE_FIRESTORE_PROJECT_ID, COLLECTION_ID.USER).then((data) => {
            console.log(data);
            setUsersData(data);
        });
    }, []);

    console.log('users');
    return (
        <>
            <div className={classes.buttonWrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        setDocumentData(FIREBASE_FIRESTORE_PROJECT_ID, COLLECTION_ID.USER, {
                            name: 'string',
                            role: userRoleTypes.DEVELOPER,
                            lastAccessed: firebase.firestore.Timestamp.fromDate(new Date()),
                            email: 'string',
                            profileImage: 'string',
                        } as DocumentDataType);
                    }}
                >
                    Add user
                </Button>
            </div>
            <div className={classes.tableWrapper}>
                {/* <pre>{JSON.stringify(usersData, null, 2)}</pre> */}
                <DataTable dataBody={usersData as Array<USER>} />
            </div>
        </>
    );
};

export default Users;
