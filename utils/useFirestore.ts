import {
  query,
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
  where,
  CollectionReference,
  WhereFilterOp,
} from "firebase/firestore";
import app from "@config/firebase";
import { useEffect, useState } from "react";

export const FIRESTORE_ENTITY = {
  kota: {
    key: "kota",
  },
};

export function useFirestore<T>(
  entity: string,
  options?: {
    id?: string;
    queryEq?: { key: string; condition: WhereFilterOp; value: string };
  }
): QuerySnapshot<T> | undefined {
  const [data, setData] = useState<QuerySnapshot<T>>();
  const _getter = async () => {
    try {
      const db = getFirestore(app);
      const cols = collection(db, entity) as CollectionReference<T>;

      if (options?.id) {
        console.log(
          "file: useFirestore.ts:34 ~ const_getter= ~ options?.id",
          options?.id
        );
        const cols = collection(
          db,
          entity,
          options.id
        ) as CollectionReference<T>;

        // const snapshot = await getDocs(cols);
        // snapshot.docs.map((doc) => console.log(doc.data()));

        // setData(snapshot);
      } else if (options?.queryEq) {
        const { queryEq } = options;
        const q = query(
          cols,
          where(queryEq.key, queryEq.condition, queryEq.value)
        );
        const snapshot = await getDocs(q);

        setData(snapshot);
      } else {
        const snapshot = await getDocs(cols);
        // snapshot.docs.map((doc) => doc.data());
        //   return snapshot;
        setData(snapshot);
      }
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
