import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { IMAGE_PATH } from '../../models/firebaseStorageModel';
import { uploadFile } from '../../utils/firebase/storage';

interface UserProfilePictureUploadProps {
    imageFilePath?: string;
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
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

const UserProfilePictureUpload: React.FC<UserProfilePictureUploadProps> = ({
    imageFilePath,
    setImageFilePath,
}: UserProfilePictureUploadProps) => {
    const classes = useStyles();

    const avatarInput = useRef<HTMLInputElement>(null);

    const [uploadedImage, setUploadedImage] = useState<{
        downloadUrl: string;
        fileName: string;
    }>({ downloadUrl: '', fileName: '' });

    useEffect(() => {
        if (imageFilePath) {
            // console.log(imageFilePath.split(RegExp(/%2..*%2F(.*?)\?alt/))[1].split('.')[0]);

            setUploadedImage({
                downloadUrl: imageFilePath,
                fileName: imageFilePath.split(RegExp(/%2..*%2F(.*?)\?alt/))[1].split('.')[0],
            });
        }
    }, [imageFilePath]);

    const uploadProfilePicture = (profileImage: File | null | undefined) => {
        if (profileImage) {
            if (!uploadedImage.downloadUrl) {
                uploadFile(IMAGE_PATH.USER_PROFILE_PICTURE, profileImage).then((url) => {
                    setUploadedImage(url);
                    setImageFilePath(url.downloadUrl);
                });
            } else {
                uploadFile(IMAGE_PATH.USER_PROFILE_PICTURE, profileImage, uploadedImage.fileName).then((url) => {
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
