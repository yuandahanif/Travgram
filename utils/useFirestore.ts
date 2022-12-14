import {
  query,
  getFirestore,
  collection,
  getDocs,
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
  },pengguna: {
    key: "pengguna",
  },
};

const getQueries = () => {};

export function useFirestore<T>(
  entity: string,
  options?: {
    id?: string;
    queryEq?: { key: string; condition: WhereFilterOp; value: string };
  }
): {
  getQuery: QuerySnapshot<T> | undefined;
  getDocument: DocumentSnapshot<T> | undefined;
} {
  const [queryRes, setQueryRes] = useState<QuerySnapshot<T> | undefined>(
    undefined
  );

  const [documentRes, setDocumentRes] = useState<
    DocumentSnapshot<T> | undefined
  >(undefined);

  const _getter = async () => {
    try {
      const db = getFirestore(app);
      const cols = collection(db, entity) as CollectionReference<T>;

      if (options?.id) {
        const docRef = doc(db, entity, options.id) as DocumentReference<T>;

        const one = await getDoc(docRef);

        setDocumentRes(one);
      } else if (options?.queryEq) {
        const { queryEq } = options;
        const q = query(
          cols,
          where(queryEq.key, queryEq.condition, queryEq.value)
        );
        // const snapshot = await getDocs(q);
        // FIXME: unsubscribe from realtime
        const subscribe = onSnapshot(q, (data) => {
          setQueryRes(data);
        });
      } else {
        // FIXME: unsubscribe from realtime
        // const snapshot = await getDocs(cols);
        const subscribe = onSnapshot(cols, (data) => {
          setQueryRes(data);
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error("Firestore error");
    }
  };

  useEffect(() => {
    _getter();
  }, []);

  return { getQuery: queryRes, getDocument: documentRes };
}
