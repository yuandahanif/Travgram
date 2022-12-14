import app from "@config/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const storage = getStorage(app);

export const STORAGE_PATHS = {
    userUpload: '/user-uploads'
}

export function useStorage() {
    const uploadByte = async ({ child, file }: { child: keyof typeof STORAGE_PATHS, file: Blob | Uint8Array | ArrayBuffer }) => {
        try {
            const storageRef = ref(storage, child);

            await uploadBytes(storageRef, file).then((snapshot) => {
                return true
            });

        } catch (error) {
            console.log(error);
            throw new Error("Upload error");

        }

    }

    return { uploadByte }
}