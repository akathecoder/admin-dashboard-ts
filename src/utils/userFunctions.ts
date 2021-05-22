import { COLLECTION_ID, DocumentDataType, USER, userRoleTypes } from '../models/firestoreModel';
import firebase from 'firebase/app';
import { deleteDocuments, setDocumentData } from './firebase/firestore';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../assets/themes/variables';

interface createUserProps {
    (projectId: string, name: string, role: userRoleTypes, email: string): void;
}

export const createUser: createUserProps = (projectId, name, role, email) => {
    const userDataToAdd: USER = {
        name: name,
        email: email,
        lastAccessed: firebase.firestore.Timestamp.fromDate(new Date()),
        role: role,
    };

    setDocumentData(projectId, COLLECTION_ID.USER, userDataToAdd as DocumentDataType);
};

interface deleteUsersProps {
    (userIds: Array<string>): Promise<void>;
}

export const deleteUsers: deleteUsersProps = (userIds) => {
    console.log(userIds);

    return deleteDocuments(FIREBASE_FIRESTORE_PROJECT_ID, COLLECTION_ID.USER, userIds).then((deleteUsers) => {
        console.log('Deleted users: ' + deleteUsers);
    });
};
