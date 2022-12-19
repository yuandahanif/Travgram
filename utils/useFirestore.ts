import {
  query,
  getFirestore,
  collection,
  QuerySnapshot,
  where,
  CollectionReference,
  WhereFilterOp,
  doc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import app from "@config/firebase";
import { useEffect, useState } from "react";

export const FIRESTORE_ENTITY = {
  kota: {
    key: "kota",
  },
  pengguna: {
    key: "pengguna",
  },
};

export function useCollection<T>(entity: string) {
  const db = getFirestore(app);
  const cols = collection(db, entity) as CollectionReference<T>;

  const [queryRes, setQueryRes] = useState<QuerySnapshot<T> | undefined>(
    undefined
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      cols,
      (data) => {
        setQueryRes(data);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, []);

  return queryRes;
}

export function useDocument<T>(entity: string, id: string) {
  const db = getFirestore(app);
  const docRef = doc(db, entity, id) as DocumentReference<T>;

  const [documentRes, setDocumentRes] = useState<
    DocumentSnapshot<T> | undefined
  >(undefined);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      docRef,
      (data) => {
        setDocumentRes(data);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, []);

  return documentRes;
}
