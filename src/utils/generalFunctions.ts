import { getDocumentData } from './firebase/firestore';
import { COLLECTION_ID, USER } from '../models/firestoreModel';

interface getUserRoleProps {
    (userId: string): Promise<string>;
}

export const getUserRole: getUserRoleProps = async (userId) => {
    const data = (await getDocumentData(COLLECTION_ID.USER, userId)) as USER;

    return data.role;
};
