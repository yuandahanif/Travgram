import { StyledImage, StyledText, StyledView } from "@components/styled";
import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FIRESTORE_ENTITY, useFQuery } from "@utils/useFirestore";
import { f_user_upload } from "types/firestore";
import { useAuthentication } from "@utils/useAuthentication";
import { useStorage } from "@utils/useStorage";

const { getUrl } = useStorage();

export default function ExploreGalleryScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "Gallery">) {
  const param = route.params;
  const urlFetched = useRef(false);
  const { user } = useAuthentication();
  const [urls, setUrls] = useState<string[]>([]);

  const gambar = useFQuery<f_user_upload>(FIRESTORE_ENTITY["user-upload"].key, [
    {
      fieldPath: "wisata_id",
      opStr: "==",
      value: param.wisataId,
    },
    {
      fieldPath: "user_id",
      opStr: "==",
      value: user?.uid || "",
    },
  ]);

  const urlAwaiter = useCallback(async () => {
    if (gambar?.docs == undefined) {
      return;
    }

    for await (const g of gambar?.docs) {
      const f = await getUrl(g.data().file_id);
      console.log("fetch url", f);
      setUrls((s) => [...s, f]);
    }

    urlFetched.current = true;
  }, [gambar]);

  //   useMemo(async () => {
  //     if (gambar?.docs != undefined) {
  //       for await (const g of gambar?.docs) {
  //         console.log(
  //           "file: gallery.tsx:53 ~ forawait ~ g.data().file_id",
  //           g.data().file_id
  //         );
  //         //   const f = await getUrl(g.data().file_id);
  //         //   console.log("fetch url", f);
  //         //   setUrls((s) => [...s, f]);
  //       }
  //     }
  //   }, [gambar]);

  useEffect(() => {
    console.log("file: gallery.tsx:41 ~ forawait ~ gambar?.docs", gambar?.docs);

    if (!urlFetched.current) {
      urlAwaiter();
    }

    // return () => {
    //   urlFetched.current = false;
    // };
  }, [gambar]);

  return (
    <StyledView className="flex-1 items-center">
      <StyledText className="mx-2 mt-2 text-black text-2xl font-bold">
        Unggahan fotomu
      </StyledText>

      <StyledView className="w-full">
        <ScrollView>
          <StyledView className="my-4 mx-2 ">
            {urls.map((url) => (
              <StyledView
                key={url}
                className={`rounded-md overflow-hidden mr-2 mb-2 w-full bg-red-100`}
              >
                {<StyledImage source={{ uri: url }} className="h-96 w-full" />}
              </StyledView>
            ))}
          </StyledView>
        </ScrollView>
      </StyledView>
    </StyledView>
  );
}
