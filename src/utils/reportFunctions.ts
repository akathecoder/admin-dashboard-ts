import { COLLECTION_ID, REPORT } from '../models/firestoreModel';
import { addDocument, deleteDocuments, setDocument } from './firebase/firestore';
import firebase from 'firebase/app';

interface createReportProps {
    (
        createdAt: firebase.firestore.Timestamp,
        reason: string,
        reportingUserUid: string,
        reportingUserName: string,
        isUserReported: boolean,
        reportedUserUid?: string,
        reportedUserName?: string,
        reportedPostId?: string,
    ): Promise<void>;
}

export const createReport: createReportProps = async (
    createdAt,
    reason,
    reportingUserUid,
    reportingUserName,
    isUserReported,
    reportedUserUid?,
    reportedUserName?,
    reportedPostId?,
) => {
    const reportDataToAdd: REPORT = {
        createdAt: createdAt,
        reason: reason,
        reportingUserUid: reportingUserUid,
        reportingUserName: reportingUserName,
        isUserReported: isUserReported,
        reportedUserUid: reportedUserUid,
        reportedUserName: reportedUserName,
        reportedPostId: reportedPostId,
    };

    return addDocument(COLLECTION_ID.REPORT, reportDataToAdd);
};

interface updateReportProps {
    (documentId: string, data: REPORT): Promise<void>;
}

export const updateReport: updateReportProps = async (documentId, data) => {
    return setDocument(COLLECTION_ID.FEEDBACK, documentId, data);
};

interface deleteReportProps {
    (documentId: Array<string>): Promise<Array<string>>;
}

export const deleteReport: deleteReportProps = async (documentIds) => {
    return deleteDocuments(COLLECTION_ID.FEEDBACK, documentIds);
};
