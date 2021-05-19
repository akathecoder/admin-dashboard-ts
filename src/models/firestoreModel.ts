export enum COLLECTION_ID {
    USER = 'USERS',
    MEMBER = 'MEMBERS',
    ARTICLE = 'ARTICLES',
    FEEDBACK = 'FEEDBACK',
    REPORT = 'REPORT',
}

enum userRoleTypes {
    ADMIN = 'admin',
    MANAGER = 'manager',
    DEVELOPER = 'developer',
}

export interface USER {
    name: string;
    role: userRoleTypes;
    lastAccessed: Date;
    email: string;
    profileImage?: string;
}

export interface MEMBER {
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
    articleBanner?: string;
    articleTitle: string;
    articleDescription: string;
    links?: Array<string>;
    type: articleTypes;
    postedBy: string;
    postedOn: Date;
}

export interface FEEDBACK {
    createdAt: Date;
    feedback: string;
    name: string;
    uid: string;
}

export interface REPORT {
    createdAt: Date;
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
