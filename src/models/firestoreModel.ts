import firebase from 'firebase/app';
export enum COLLECTION_ID {
    USER = 'USERS',
    MEMBER = 'MEMBERS',
    ARTICLE = 'ARTICLES',
    FEEDBACK = 'FEEDBACK',
    REPORT = 'REPORT',
}

export enum userRoleTypes {
    ADMIN = 'admin',
    MANAGER = 'manager',
    DEVELOPER = 'developer',
}

export interface USER {
    id?: string;
    name: string;
    role: userRoleTypes;
    lastAccessed: firebase.firestore.Timestamp;
    email: string;
    profileImage?: string;
}

export interface MEMBER {
    id?: string;
    name: string;
    phone: string;
    profileImage?: string;
    gender: string;
    email: string;
    college: string;
    currentProfession: string;
    uid: string;
    yearOfPassing: number;
    address?: string;
}

enum articleTypes {
    BLOG = 'blog',
    NEWS = 'news',
}

export interface ARTICLE {
    id?: string;
    articleBanner?: string;
    articleTitle: string;
    articleDescription: string;
    links?: Array<string>;
    type: articleTypes;
    postedBy: string;
    postedOn: firebase.firestore.Timestamp;
}

export interface FEEDBACK {
    id?: string;
    createdAt: firebase.firestore.Timestamp;
    feedback: string;
    name: string;
    uid: string;
}

export interface REPORT {
    id?: string;
    createdAt: firebase.firestore.Timestamp;
    reason: string;
    reportingUserUid: string;
    reportingUserName: string;
    isUserReported: boolean;
    reportedUserUid?: string;
    reportedUserName?: string;
    reportedPostId?: string;
}

// Data Types
export type CollectionDataType = Array<ARTICLE | MEMBER | USER | FEEDBACK | REPORT>;
export type DocumentDataType = ARTICLE | MEMBER | USER | FEEDBACK | REPORT;
