import { CollectionDataType, COLLECTION_ID, DocumentDataType } from '../../models/firestoreModel';
import { firestoreDB } from './firebase';

interface getCollectionDataProps {
    (projectId: string, collectionId: COLLECTION_ID): Promise<CollectionDataType>;
}

export const getCollectionData: getCollectionDataProps = async (projectId, collectionId) => {
    const data = await firestoreDB.collection('projects').doc(projectId).collection(collectionId).get();

    const collectionData = data.docs.map((doc) => doc.data()) as CollectionDataType;

    return collectionData;
};

interface getDocumentDataProps {
    (projectId: string, collectionId: COLLECTION_ID, documentId: string): Promise<DocumentDataType>;
}

export const getDocumentData: getDocumentDataProps = async (projectId, collectionId, documentId) => {
    const data = await firestoreDB.collection('projects').doc(projectId).collection(collectionId).doc(documentId).get();

    const documentData = data.data() as DocumentDataType;

    return documentData;
};

interface setDocumentDataProps {
    (projectId: string, collectionId: COLLECTION_ID, document: DocumentDataType): void;
}

export const setDocumentData: setDocumentDataProps = async (projectId, collectionId, document) => {
    const data = await firestoreDB.collection('projects').doc(projectId).collection(collectionId).add(document);

    console.log(data);

    // return documentData;
};
