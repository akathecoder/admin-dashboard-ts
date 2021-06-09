import { COLLECTION_ID, MEMBER } from '../models/firestoreModel';
import { addDocument, deleteDocuments, setDocument } from './firebase/firestore';

interface createMemberProps {
    (
        name: string,
        phone: number,
        gender: string,
        email: string,
        college: string,
        currentProfession: string,
        uid: string,
        yearOfPassing: number,
        profileImage?: string,
        address?: string,
    ): Promise<void>;
}

export const createMember: createMemberProps = async (
    name,
    phone,
    gender,
    email,
    college,
    currentProfession,
    uid,
    yearOfPassing,
    profileImage?,
    address?,
) => {
    const memberDataToAdd: MEMBER = {
        name: name,
        phone: phone,
        gender: gender,
        email: email,
        college: college,
        currentProfession: currentProfession,
        uid: uid,
        yearOfPassing: yearOfPassing,
        profileImage: profileImage || '',
        address: address || '',
    };

    return addDocument(COLLECTION_ID.MEMBER, memberDataToAdd);
};

interface updateMemberProps {
    (documentId: string, data: MEMBER): Promise<void>;
}

export const updateMember: updateMemberProps = async (documentId, data) => {
    return setDocument(COLLECTION_ID.MEMBER, documentId, data);
};

interface deleteMembersProps {
    (documentId: Array<string>): Promise<Array<string>>;
}

export const deleteMembers: deleteMembersProps = async (documentIds) => {
    return deleteDocuments(COLLECTION_ID.MEMBER, documentIds);
};
