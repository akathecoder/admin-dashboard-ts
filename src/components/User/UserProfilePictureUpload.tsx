import React, { useRef } from 'react';

interface UserProfilePictureUploadProps {
    setImageFilePath: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

const UserProfilePictureUpload: React.FC<UserProfilePictureUploadProps> = ({
    setImageFilePath,
}: UserProfilePictureUploadProps) => {
    const avatarInput = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpg"
                ref={avatarInput}
                onChange={() => setImageFilePath(avatarInput.current?.files?.item(0))}
            />
        </div>
    );
};

export default UserProfilePictureUpload;
