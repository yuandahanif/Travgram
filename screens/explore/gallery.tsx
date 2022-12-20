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
import {
  FIRESTORE_ENTITY,
  useDocRef,
  useDocument,
  useFQuery,
} from "@utils/useFirestore";
import {
  f_kota,
  f_kota__wisata,
  f_pengguna,
  f_user_upload,
} from "types/firestore";
import showFormattedDate from "@utils/dateUtil";

export default function ExploreGalleryScreen({
  route,
}: StackScreenProps<ExploreStackParamList, "Gallery">) {
  const param = route.params;

  const penggunaRef = useDocRef<f_pengguna>(
    FIRESTORE_ENTITY.pengguna.key,
    param?.userId
  );
  const kota = useDocument<f_kota>(FIRESTORE_ENTITY.kota.key, param?.cityId);

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
      console.log(
        "file: gallery.tsx:50 ~ gambar?.docs.forEach ~ g.data()",
        g.data()
      );
      gs.push(g.data());
    });

    return gs;
  }, [gambar]);

  const wisataMemo = useMemo<f_kota__wisata>(() => {
    if (!kota?.data()?.wisata) {
      return {
        deskripsi: "",
        gambar: [
          "https://safebooru.org//images/4041/5535c37fb16e207227e7360a9feb1b0614343642.jpg",
        ],
        nama: "",
      };
    }

    const data = kota?.data()?.wisata[param?.wisataId];
    if (data) {
      return data;
    }

    return {
      deskripsi: "",
      gambar: [
        "https://safebooru.org//images/4041/5535c37fb16e207227e7360a9feb1b0614343642.jpg",
      ],
      nama: "",
    };
  }, [kota]);

  return (
    <StyledView className="flex-1 items-center">
      <StyledView className="w-full">
        <ScrollView>
          <StyledText className="mx-auto mb-2 mt-2 text-black text-2xl font-bold">
            Unggahanmu
          </StyledText>
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
                      className="mt-auto p-2 w-full flex-row"
                      style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
                    >
                      <StyledText className="text-white">
                        {kota?.data() && kota?.data()?.wisata[g.wisata_id].nama}
                      </StyledText>
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
