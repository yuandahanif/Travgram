import {
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
  CollectionReference,
} from "firebase/firestore";
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

export function useFirestore<T>(entity: string): QuerySnapshot<T> | undefined {
  const [data, setData] = useState<QuerySnapshot<T>>();
  const _getter = async () => {
    try {
      const db = getFirestore(app);
      const cols = collection(db, entity) as CollectionReference<T>;

      const snapshot = await getDocs(cols);
      snapshot.docs.map((doc) => doc.data());
      //   return snapshot;
      setData(snapshot);
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
