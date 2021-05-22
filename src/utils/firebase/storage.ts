import { IMAGE_PATH } from '../../models/firebaseStorageModel';
import { firebaseStorage } from './firebase';
import { v4 as uuidv4 } from 'uuid';

interface uploadFileProps {
    (projectId: string, filePath: IMAGE_PATH, file: File | null | undefined): Promise<string>;
}

export const uploadFile: uploadFileProps = async (projectId, filePath, file) => {
    console.log(file?.name.slice(0, -4));

    const storageRef = firebaseStorage.ref(`${projectId}/${filePath}/${uuidv4()}`);

    const downloadUrl: string = await storageRef.put(file as Blob).then((e) => {
        return e.ref.getDownloadURL();
    });

    return downloadUrl;
};
