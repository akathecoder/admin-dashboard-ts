import React, { useState, useEffect } from 'react';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../../assets/themes/variables';
import { CollectionDataType, COLLECTION_ID, DocumentDataType, userRoleTypes } from '../../models/firestoreModel';
import { getCollectionData, setDocumentData } from '../../utils/firebase/firestore';

const Users: React.FC = () => {
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
            <div>Users</div>
            <div>
                <button
                    onClick={() => {
                        setDocumentData(FIREBASE_FIRESTORE_PROJECT_ID, COLLECTION_ID.USER, {
                            name: 'string',
                            role: userRoleTypes.DEVELOPER,
                            lastAccessed: new Date(),
                            email: 'string',
                            profileImage: 'string',
                        } as DocumentDataType);
                    }}
                >
                    Create
                </button>
            </div>
            <div>
                <pre>{JSON.stringify(usersData, null, 2)}</pre>
            </div>
        </>
    );
};

export default Users;
