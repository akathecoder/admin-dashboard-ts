import { CollectionDataType, COLLECTION_ID, DocumentDataType } from '../../models/firestoreModel';
import { firestoreDB } from './firebase';

interface getCollectionDataProps {
    (projectId: string, collectionId: COLLECTION_ID): Promise<CollectionDataType>;
}

export const getCollectionData: getCollectionDataProps = async (projectId, collectionId) => {
    const data = await firestoreDB.collection('projects').doc(projectId).collection(collectionId).get();

    const collectionData = data.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        };
    }) as CollectionDataType;

    return collectionData;
};

interface getDocumentDataProps {
    (projectId: string, collectionId: COLLECTION_ID, documentId: string): Promise<DocumentDataType>;
}

export const getDocumentData: getDocumentDataProps = async (projectId, collectionId, documentId) => {
    const data = await firestoreDB.collection('projects').doc(projectId).collection(collectionId).doc(documentId).get();

    const documentData = { ...data.data(), id: data.id } as DocumentDataType;

    return documentData;
};

interface addDocumentProps {
    (projectId: string, collectionId: COLLECTION_ID, document: DocumentDataType): Promise<void>;
}

export const addDocument: addDocumentProps = async (projectId, collectionId, document) => {
    const data = await firestoreDB.collection('projects').doc(projectId).collection(collectionId).add(document);
    console.log(data);
};

interface deleteDocumentsProps {
    (projectId: string, collectionId: COLLECTION_ID, documentIdList: Array<string>): Promise<Array<string>>;
}

export const deleteDocuments: deleteDocumentsProps = async (projectId, collectionId, documentIdList) => {
    const deletedUsers = await Promise.all(
        documentIdList.map(async (documentId) => {
            await firestoreDB.collection('projects').doc(projectId).collection(collectionId).doc(documentId).delete();
            return documentId;
        }),
    );

    return deletedUsers;
};

interface setDocumentProps {
    (projectId: string, collectionId: COLLECTION_ID, documentId: string, document: DocumentDataType): Promise<void>;
}

export const setDocument: setDocumentProps = async (projectId, collectionId, documentId, document) => {
    const data = await firestoreDB
        .collection('projects')
        .doc(projectId)
        .collection(collectionId)
        .doc(documentId)
        .set(document);
    console.log(data);
};
