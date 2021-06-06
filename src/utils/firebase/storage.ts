import { IMAGE_PATH } from '../../models/firebaseStorageModel';
import { firebaseStorage } from './firebase';
import { v4 as uuidv4 } from 'uuid';

interface uploadFileProps {
    (filePath: IMAGE_PATH, file: File | null | undefined, fileName?: string): Promise<{
        downloadUrl: string;
        fileName: string;
    }>;
}

export const uploadFile: uploadFileProps = async (filePath, file, fileName) => {
    console.log(file?.name.slice(0, -4));

    if (!fileName) {
        fileName = uuidv4();
    }

    const storageRef = firebaseStorage.ref(`${filePath}/${fileName}`);

    const downloadUrl: string = await storageRef.put(file as Blob).then((e) => {
        return e.ref.getDownloadURL();
    });

    return { downloadUrl: downloadUrl, fileName: fileName };
};
