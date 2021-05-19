import { CollectionDataType, COLLECTION_ID } from '../../models/firestoreModel';
import { firestoreDB } from './firebase';

// type CollectionDataType = Array<ARTICLE | MEMBER | USER | FEEDBACK | REPORT>;

interface getCollectionDataProps {
    (projectId: string, collectionId: COLLECTION_ID): Promise<CollectionDataType>;
}

export const getCollectionData: getCollectionDataProps = async (projectId, collectionId) => {
    const data = await firestoreDB.collection('projects').doc(projectId).collection(collectionId).get();

    const collectionData = data.docs.map((doc) => doc.data()) as CollectionDataType;

    return collectionData;
};
