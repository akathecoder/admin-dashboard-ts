import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { FIREBASE_FIRESTORE_PROJECT_ID } from '../../assets/themes/variables';
import { IMAGE_PATH } from '../../models/firebaseStorageModel';
import { uploadFile } from '../../utils/firebase/storage';

interface UserProfilePictureUploadProps {
    setImageFilePath: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme) => ({
    root: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

const UserProfilePictureUpload: React.FC<UserProfilePictureUploadProps> = ({
    setImageFilePath,
}: UserProfilePictureUploadProps) => {
    const classes = useStyles();

    const avatarInput = useRef<HTMLInputElement>(null);

    const [uploadedImage, setUploadedImage] = useState<{
        downloadUrl: string;
        fileName: string;
    }>({ downloadUrl: '', fileName: '' });

    const uploadProfilePicture = (profileImage: File | null | undefined) => {
        if (profileImage) {
            if (!uploadedImage.downloadUrl) {
                uploadFile(FIREBASE_FIRESTORE_PROJECT_ID, IMAGE_PATH.USER_PROFILE_PICTURE, profileImage).then((url) => {
                    setUploadedImage(url);
                    setImageFilePath(url.downloadUrl);
                });
            } else {
                uploadFile(
                    FIREBASE_FIRESTORE_PROJECT_ID,
                    IMAGE_PATH.USER_PROFILE_PICTURE,
                    profileImage,
                    uploadedImage.fileName,
                ).then((url) => {
                    setUploadedImage(url);
                    setImageFilePath(url.downloadUrl);
                });
            }
        }
    };

    return (
        <div className={classes.root}>
            <input
                type="file"
                name="avatar"
                id="avatar-upload"
                accept="image/png, image/jpg"
                className={classes.input}
                ref={avatarInput}
                onChange={() => uploadProfilePicture(avatarInput.current?.files?.item(0))}
            />
            <label htmlFor="avatar-upload">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <Avatar className={classes.large} src={uploadedImage.downloadUrl} />
                </IconButton>
            </label>
        </div>
    );
};

export default UserProfilePictureUpload;
