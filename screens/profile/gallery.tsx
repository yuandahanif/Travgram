import { StyledImage, StyledText, StyledView } from "@components/styled";
import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProfileDrawerList } from "@navigation/userTab";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FIRESTORE_ENTITY, useDocRef, useFQuery } from "@utils/useFirestore";
import { f_pengguna, f_user_upload } from "types/firestore";
import { useAuthentication } from "@utils/useAuthentication";

export default function ProfileGalleryScreen({
  navigation,
  route,
}: StackScreenProps<ProfileDrawerList, "Gallery">) {
  const { user, extra } = useAuthentication();

  const penggunaRef = useDocRef<f_pengguna>(
    FIRESTORE_ENTITY.pengguna.key,
    extra?.uid || ""
  );

  const gambar = useFQuery<f_user_upload>(FIRESTORE_ENTITY["user-upload"].key, [
    {
      fieldPath: "user_id",
      opStr: "==",
      value: penggunaRef,
    },
  ]);

  const gambarMemo = useMemo<f_user_upload[]>(() => {
    const gs: f_user_upload[] = [];

    gambar?.docs.forEach((g) => {
      console.log(
        "file: gallery.tsx:35 ~ gambar?.docs.forEach ~ g.data()",
        g.data()
      );
      gs.push(g.data());
    });

    return gs;
  }, [gambar]);

  // useEffect(() => {
  //   if (user && gambar == undefined) {
  //     console.log("fetching");

  //     setGambar(

  //     );
  //   }
  // }, [user]);

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
