import {
  StyledImageBackground,
  StyledPressable,
  StyledText,
  StyledView,
} from "@components/styled";
import { BackHandler, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useCallback, useMemo, useState } from "react";
import {
  FIRESTORE_ENTITY,
  useDocRef,
  useDocument,
  useFQuery,
} from "@utils/useFirestore";
import { f_kota, f_pengguna, f_user_upload } from "types/firestore";
import showFormattedDate from "@utils/dateUtil";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const MyGallery = ({
  userId,
  wisataId,
  kota,
}: {
  userId: string;
  wisataId: string;
  kota: f_kota;
}) => {
  const penggunaRef = useDocRef<f_pengguna>(
    FIRESTORE_ENTITY.pengguna.key,
    userId
  );

  const gambar = useFQuery<f_user_upload>(
    FIRESTORE_ENTITY["user-upload"].key,
    [
      {
        fieldPath: "wisata_id",
        opStr: "==",
        value: wisataId,
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
    const gs: f_user_upload[] = [];

    gambar?.docs.forEach((g) => {
      gs.push(g.data());
    });

    return gs;
  }, [gambar]);

  return (
    <StyledView className="mx-2 mb-16 ">
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
                className="mt-auto p-2 w-full flex-row"
                style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
              >
                <StyledText className="text-white">
                  {kota?.wisata[g.wisata_id].nama}
                </StyledText>
                <StyledText className="ml-auto text-white">
                  {showFormattedDate(g.waktu_unggah.toDate())}
                </StyledText>
              </StyledView>

              {/* <StyledView
                className="px-2 pb-2 w-full justify-end flex-row items-center"
                style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
              >
                <StyledText>aaa</StyledText>
              </StyledView> */}

              <StyledView
                className="px-2 pb-2 w-full justify-end flex-row items-center"
                style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
              >
                {!g.is_accepted && (
                  <>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={24}
                      color="rgb(156,163,175)"
                    />
                    <StyledText className="text-gray-400 ml-1">
                      Sedang dalam peninjauan
                    </StyledText>
                  </>
                )}
                {g.is_accepted && (
                  <>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={24}
                      color="#7cff5c"
                    />
                    <StyledText className="text-white ml-1">Lolos</StyledText>
                  </>
                )}
              </StyledView>
            </StyledView>
          </StyledImageBackground>
        </StyledView>
      ))}
    </StyledView>
  );
};

const AllGallery = ({
  wisataId,
  kota,
}: {
  userId: string;
  wisataId: string;
  kota: f_kota;
}) => {
  const gambar = useFQuery<f_user_upload>(
    FIRESTORE_ENTITY["user-upload"].key,
    [
      {
        fieldPath: "wisata_id",
        opStr: "==",
        value: wisataId,
      },
      {
        fieldPath: "is_accepted",
        opStr: "==",
        value: true,
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
    <StyledView className="mx-2 mb-16 ">
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
                className="mt-auto p-2 w-full flex-row"
                style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
              >
                <StyledText className="text-white">
                  {kota && kota?.wisata[g.wisata_id].nama}
                </StyledText>
                <StyledText className="ml-auto text-white">
                  {showFormattedDate(g.waktu_unggah.toDate())}
                </StyledText>
              </StyledView>
              <StyledView
                className="px-2 pb-2 w-full flex-row"
                style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
              >
                <StyledText className="text-white">
                  {/* {(kota &&
                    kota?.wisata[g.wisata_id] &&
                    kota?.wisata[g.wisata_id]?.quests !== undefined &&
                    kota?.wisata[g.wisata_id]?.quests[g.quest_id].nama) ||
                    ""} */}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledImageBackground>
        </StyledView>
      ))}
    </StyledView>
  );
};

export default function ExploreGalleryScreen({
  route,
}: StackScreenProps<ExploreStackParamList, "Gallery">) {
  const param = route.params;
  const [galleryType, setgalleryType] = useState<"me" | "all">("me");

  const kota = useDocument<f_kota>(FIRESTORE_ENTITY.kota.key, param?.cityId);

  const kotaMemo = useMemo(() => {
    if (kota?.data()) {
      return kota.data();
    }
  }, [kota]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <StyledView className="flex-1 items-center">
      <StyledView className="w-full">
        <StyledView className="mb-4 mt-4 flex-row justify-evenly">
          <StyledPressable
            onPress={() => {
              setgalleryType("me");
            }}
          >
            <StyledText
              className={`${
                galleryType == "me" ? "text-cyan-400" : "text-black"
              } text-xl font-bold`}
            >
              Fotoku
            </StyledText>
          </StyledPressable>

          <StyledPressable
            onPress={() => {
              setgalleryType("all");
            }}
          >
            <StyledText
              className={`${
                galleryType == "all" ? "text-cyan-400" : "text-black"
              } text-xl font-bold`}
            >
              Semua Foto
            </StyledText>
          </StyledPressable>
        </StyledView>

        <ScrollView>
          {galleryType == "me" && kotaMemo && (
            <MyGallery
              kota={kotaMemo}
              userId={param.userId}
              wisataId={param.wisataId}
            />
          )}
          {galleryType == "all" && kotaMemo && (
            <AllGallery
              kota={kotaMemo}
              userId={param.userId}
              wisataId={param.wisataId}
            />
          )}
        </ScrollView>
      </StyledView>
    </StyledView>
  );
}
