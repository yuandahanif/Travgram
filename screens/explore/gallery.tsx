import {
  StyledImage,
  StyledImageBackground,
  StyledText,
  StyledView,
} from "@components/styled";
import { ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useMemo } from "react";
import { FIRESTORE_ENTITY, useDocRef, useFQuery } from "@utils/useFirestore";
import { f_pengguna, f_user_upload } from "types/firestore";
import showFormattedDate from "@utils/dateUtil";

export default function ExploreGalleryScreen({
  route,
}: StackScreenProps<ExploreStackParamList, "Gallery">) {
  const param = route.params;

  const penggunaRef = useDocRef<f_pengguna>(
    FIRESTORE_ENTITY.pengguna.key,
    param?.userId
  );
  const gambar = useFQuery<f_user_upload>(
    FIRESTORE_ENTITY["user-upload"].key,
    [
      {
        fieldPath: "wisata_id",
        opStr: "==",
        value: param.wisataId,
      },
      {
        fieldPath: "user_id",
        opStr: "==",
        value: penggunaRef,
      },
    ],
    { fieldPath: "waktu_unggah", directionStr: "desc" }
  );

  const gambarMemo = useMemo<f_user_upload[]>(() => {
    if (!gambar) {
      return [];
    }

    const gs: f_user_upload[] = [];

    gambar?.docs.forEach((g) => {
      gs.push(g.data());
    });

    return gs;
  }, [gambar]);

  return (
    <StyledView className="flex-1 items-center">
      <StyledText className="mx-2 mb-2 mt-2 text-black text-2xl font-bold">
        Unggahanmu
      </StyledText>

      <StyledView className="w-full">
        <ScrollView>
          <StyledView className="my-4 mx-2 mb-12 ">
            {gambarMemo.map((g) => (
              <StyledView
                key={g.file_id}
                className={`rounded-md overflow-hidden mr-2 mb-2 w-full bg-red-100`}
              >
                <StyledImageBackground
                  source={{ uri: g.file_url }}
                  className="h-96 w-full"
                >
                  <StyledView className="flex-1 justify-center items-center">
                    <StyledView
                      className="mt-auto p-2 w-full"
                      style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
                    >
                      <StyledText className="ml-auto text-white">
                        {showFormattedDate(g.waktu_unggah.toDate())}
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledImageBackground>
              </StyledView>
            ))}
          </StyledView>
        </ScrollView>
      </StyledView>
    </StyledView>
  );
}
