import { COLLECTION_ID, MEMBER, PrimitiveTypes } from '../models/firestoreModel';
import { addDocument, deleteDocuments, updateDocument } from './firebase/firestore';

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
    (documentId: string, field: string, value: PrimitiveTypes): Promise<void>;
}

export const updateMember: updateMemberProps = async (documentId, field, value) => {
    // console.log('data', data);

    let dataToUpdate = {};

    switch (field) {
        case 'name':
            dataToUpdate = {
                name: value,
            };
            break;

        case 'phone':
            dataToUpdate = {
                phone: Number(value),
            };
            break;
        case 'profileImage':
            dataToUpdate = {
                profileImage: value,
            };
            break;
        case 'gender':
            dataToUpdate = {
                gender: value,
            };
            break;
        case 'email':
            dataToUpdate = {
                email: value,
            };
            break;
        case 'college':
            dataToUpdate = {
                college: value,
            };
            break;
        case 'currentProfession':
            dataToUpdate = {
                currentProfession: value,
            };
            break;
        case 'uid':
            dataToUpdate = {
                uid: value,
            };
            break;
        case 'yearOfPassing':
            dataToUpdate = {
                yearOfPassing: Number(value),
            };
            break;
        case 'address':
            dataToUpdate = {
                address: value,
            };
            break;

        default:
            break;
    }

    console.log('updated', dataToUpdate);

    return updateDocument(COLLECTION_ID.MEMBER, documentId, dataToUpdate);
};

interface deleteMembersProps {
    (documentId: Array<string>): Promise<Array<string>>;
}

export const deleteMembers: deleteMembersProps = async (documentIds) => {
    return deleteDocuments(COLLECTION_ID.MEMBER, documentIds);
};
