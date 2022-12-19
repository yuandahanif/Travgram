import { StyledImage, StyledText, StyledView } from "@components/styled";
import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FIRESTORE_ENTITY, useFQuery } from "@utils/useFirestore";
import { f_user_upload } from "types/firestore";
import { useAuthentication } from "@utils/useAuthentication";
import { useStorage } from "@utils/useStorage";

export default function ExploreGalleryScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "Gallery">) {
  const param = route.params;
  const { user } = useAuthentication();

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

  const gambarMemo = useMemo<f_user_upload[]>(() => {
    console.log("file: gallery.tsx:33 ~ gambarMemo ~ gambar", gambar);
    if (!gambar) {
      return [];
    }

    const gs: f_user_upload[] = [];

    gambar?.docs.forEach((g) => {
      console.log("file: gallery.tsx:37 ~ gambar.forEach ~ g.data()", g.data());
      gs.push(g.data());
    });

    return gs;
  }, [gambar]);

  return (
    <StyledView className="flex-1 items-center">
      <StyledText className="mx-2 mt-2 text-black text-2xl font-bold">
        Unggahan fotomu
      </StyledText>

      <StyledView className="w-full">
        <ScrollView>
          <StyledView className="my-4 mx-2 ">
            {gambarMemo.map((g) => (
              <StyledView
                key={g.file_id}
                className={`rounded-md overflow-hidden mr-2 mb-2 w-full bg-red-100`}
              >
                {
                  <StyledImage
                    source={{ uri: g.file_url }}
                    className="h-96 w-full"
                  />
                }
                <StyledText>{g.quest_id}</StyledText>
              </StyledView>
            ))}
          </StyledView>
        </ScrollView>
      </StyledView>
    </StyledView>
  );
}
