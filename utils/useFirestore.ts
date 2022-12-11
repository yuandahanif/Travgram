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
  },
};

const getQueryes = () => {

}

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
        // if (one.exists()) {
        //   console.log("Document data:", one.data());
        // } else {
        //   console.log("No such document!");
        // }

        // snapshot.docs.map((doc) => console.log(doc.data()));

        setDocumentRes(one);
      } else if (options?.queryEq) {
        const { queryEq } = options;
        const q = query(
          cols,
          where(queryEq.key, queryEq.condition, queryEq.value)
        );
        const snapshot = await getDocs(q);

        setQueryRes(snapshot);
      } else {
        // const snapshot = await getDocs(cols);
        const snapshot = onSnapshot(cols, (data) => {
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
