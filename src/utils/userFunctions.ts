import { COLLECTION_ID, DocumentDataType, USER, userRoleTypes } from '../models/firestoreModel';
import firebase from 'firebase/app';
import { deleteDocuments, addDocument, setDocument } from './firebase/firestore';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../assets/themes/variables';
import { uploadFile } from './firebase/storage';
import { IMAGE_PATH } from '../models/firebaseStorageModel';

interface createUserProps {
    (
        projectId: string,
        name: string,
        role: userRoleTypes,
        email: string,
        profileImage: File | null | undefined,
    ): Promise<void>;
}

export const createUser: createUserProps = async (projectId, name, role, email, profileImage) => {
    let profileImagePath = '';

    if (profileImage) {
        profileImagePath = await uploadFile(
            FIREBASE_FIRESTORE_PROJECT_ID,
            IMAGE_PATH.USER_PROFILE_PICTURE,
            profileImage,
        );
    }

    const userDataToAdd: USER = {
        name: name,
        email: email,
        lastAccessed: firebase.firestore.Timestamp.fromDate(new Date()),
        role: role,
        profileImage: profileImagePath || '',
    };

    return addDocument(projectId, COLLECTION_ID.USER, userDataToAdd as DocumentDataType);
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

interface modifyUserProps {
    (projectId: string, userData: USER): Promise<void>;
}

export const modifyUser: modifyUserProps = (projectId, userData) => {
    const userDataToModify: USER = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profileImage: userData.profileImage || '',
        lastAccessed: userData.lastAccessed,
    };

    return setDocument(projectId, COLLECTION_ID.USER, userData.id!, userDataToModify as DocumentDataType);
};
