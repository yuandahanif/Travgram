import {
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
  doc,
  CollectionReference,
} from "firebase/firestore";
import * as admin from "firebase-admin";
import app from "@config/firebase";
import { useEffect, useState } from "react";

export const FIRESTORE_ENTITY = {
  kota: {
    key: "kota",
    type: {
      nama: "",
      gambar: "",
      wisata: [{ deskripsi: "", gambar: [""], nama: "" }],
    },
  },
};

// const converter = <T>() => ({
//   toFirestore: (data: T) => data,
//   fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
//     snap.data() as T,
// });

// const dataPoint = <T>(collectionPath: string) =>
//   collection(app, collectionPath).withConverter

export function useFirestore<T>(
  entity: string
): CollectionReference<T> | undefined {
  const [data, setData] = useState<CollectionReference<T>>();
  const _getter = async () => {
    try {
      const db = getFirestore(app);
      const cols = collection(db, entity) as CollectionReference<T>;
      console.log("file: useFirestore.ts:42 ~ const_getter= ~ cols", cols);

      //   const snapshot = await getDocs(cols);
      // snapshot.docs.map((doc) => doc.data());
      //   return snapshot;
      setData(cols);
    } catch (error) {
      console.error(error);
      throw new Error("Firestore error");
    }
  };

  useEffect(() => {
    _getter();
  }, []);

  return data;
}
