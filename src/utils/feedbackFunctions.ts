import { COLLECTION_ID, FEEDBACK } from '../models/firestoreModel';
import { addDocument, deleteDocuments, setDocument } from './firebase/firestore';
import firebase from 'firebase/app';

interface createFeedbackProps {
    (uid: string, name: string, feedback: string, createdAt: firebase.firestore.Timestamp): Promise<void>;
}

export const createFeedback: createFeedbackProps = async (uid, name, feedback, createdAt) => {
    const memberDataToAdd: FEEDBACK = {
        uid: uid,
        name: name,
        feedback: feedback,
        createdAt: createdAt,
    };

    return addDocument(COLLECTION_ID.FEEDBACK, memberDataToAdd);
};

interface updateFeedbackProps {
    (documentId: string, data: FEEDBACK): Promise<void>;
}

export const updateFeedback: updateFeedbackProps = async (documentId, data) => {
    return setDocument(COLLECTION_ID.FEEDBACK, documentId, data);
};

interface deleteFeedbackProps {
    (documentId: Array<string>): Promise<Array<string>>;
}

export const deleteFeedback: deleteFeedbackProps = async (documentIds) => {
    return deleteDocuments(COLLECTION_ID.FEEDBACK, documentIds);
};
