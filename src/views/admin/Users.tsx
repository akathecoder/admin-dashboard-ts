import React, { useState, useEffect } from 'react';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../../assets/themes/variables';
import { CollectionDataType, COLLECTION_ID } from '../../models/firestoreModel';
import { getCollectionData } from '../../utils/firebase/firestore';

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
                <pre>{JSON.stringify(usersData, null, 2)}</pre>
            </div>
        </>
    );
};

export default Users;
