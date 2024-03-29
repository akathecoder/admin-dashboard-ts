import { COLLECTION_ID, DocumentDataType, USER, userRoleTypes } from '../models/firestoreModel';
import firebase from 'firebase/app';
import { deleteDocuments, setDocument } from './firebase/firestore';
import { CreateUserWithEmailAndPassword } from './firebase/auth';

interface createUserProps {
    (name: string, role: userRoleTypes, email: string, profileImage: string, password: string): Promise<void>;
}

export const createUser: createUserProps = async (name, role, email, profileImage, password) => {
    const userDataToAdd: USER = {
        name: name,
        email: email,
        lastAccessed: firebase.firestore.Timestamp.fromDate(new Date()),
        role: role,
        profileImage: profileImage || '',
    };

    const uid = await CreateUserWithEmailAndPassword(email, password, name, profileImage);
    console.log('uid: ', uid);

    // return addDocument(projectId, COLLECTION_ID.USER, userDataToAdd as DocumentDataType);
    return setDocument(COLLECTION_ID.USER, uid!, userDataToAdd as DocumentDataType);
};

interface deleteUsersProps {
    (userIds: Array<string>): Promise<void>;
}

export const deleteUsers: deleteUsersProps = (userIds) => {
    console.log(userIds);

    return deleteDocuments(COLLECTION_ID.USER, userIds).then((deleteUsers) => {
        console.log('Deleted users: ' + deleteUsers);
    });
};

interface modifyUserProps {
    (userData: USER): Promise<void>;
}

export const modifyUser: modifyUserProps = (userData) => {
    const userDataToModify: USER = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profileImage: userData.profileImage || '',
        lastAccessed: userData.lastAccessed,
    };

    return setDocument(COLLECTION_ID.USER, userData.id!, userDataToModify as DocumentDataType);
};
