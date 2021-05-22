import { COLLECTION_ID, DocumentDataType, USER, userRoleTypes } from '../models/firestoreModel';
import firebase from 'firebase/app';
import { setDocumentData } from './firebase/firestore';

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
