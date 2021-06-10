import { ARTICLE, articleTypes, COLLECTION_ID } from '../models/firestoreModel';
import firebase from './firebase/firebase';
import { addDocument, deleteDocuments, setDocument } from './firebase/firestore';

interface createArticleProps {
    (
        articleTitle: string,
        articleDescription: string,
        type: articleTypes,
        postedBy: string,
        postedOn: firebase.firestore.Timestamp,
        articleBanner?: string,
        links?: Array<string>,
    ): Promise<void>;
}

export const createArticle: createArticleProps = async (
    articleTitle,
    articleDescription,
    type,
    postedBy,
    postedOn,
    articleBanner?,
    links?,
) => {
    const articleDataToAdd: ARTICLE = {
        articleDescription: articleDescription,
        articleTitle: articleTitle,
        postedBy: postedBy,
        postedOn: postedOn,
        type: type,
        articleBanner: articleBanner || '',
        links: links || [],
    };

    return addDocument(COLLECTION_ID.ARTICLE, articleDataToAdd);
};

interface updateArticleProps {
    (documentId: string, data: ARTICLE): Promise<void>;
}

export const updateArticle: updateArticleProps = async (documentId, data) => {
    return setDocument(COLLECTION_ID.ARTICLE, documentId, data);
};

interface deleteArticleProps {
    (documentId: Array<string>): Promise<Array<string>>;
}

export const deleteArticles: deleteArticleProps = async (documentIds) => {
    return deleteDocuments(COLLECTION_ID.ARTICLE, documentIds);
};
