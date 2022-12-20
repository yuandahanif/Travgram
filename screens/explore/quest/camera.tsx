import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useState } from "react";
import { db } from "@config/firebase";

import { COLORS } from "@config/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyledImageBackground,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@components/styled";
import { useStorage } from "@utils/useStorage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useAuthentication } from "@utils/useAuthentication";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { f_user_upload } from "types/firestore";
import { FIRESTORE_ENTITY, useDocRef } from "@utils/useFirestore";

const { uploadByte, getUrl } = useStorage();

const CameraPreview = ({
  photo,
  onRetake,
  isUploading,
  onUpload,
}: {
  photo: CameraCapturedPicture;
  onRetake: () => void;
  onUpload: () => void;
  isUploading: boolean;
}) => {
  return (
    <StyledView className="flex-1 w-full h-full">
      <StyledImageBackground
        source={{ uri: photo && photo.uri }}
        className="flex-1"
      >
        {isUploading && (
          <StyledView className=" my-auto justify-center items-center">
            <ActivityIndicator size={82} />
          </StyledView>
        )}
        <StyledView className="flex-row mt-auto mb-4 py-5 bg-white justify-around">
          <StyledTouchableOpacity onPress={onRetake} className="">
            <StyledText>Ambil Ulang</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity className="" onPress={onUpload}>
            <StyledText>Unggah</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledImageBackground>
    </StyledView>
  );
};

export default function CameraScreen({
  route,
}: StackScreenProps<ExploreStackParamList, "Camera">) {
  let camera: Camera;
  const param = route.params;
  const { user } = useAuthentication();

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isUploading, setIsUploading] = useState(false);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log("file: camera.tsx:60 ~ const__takePicture= ~ photo", photo);
    setCapturedImage(photo);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
  };

  const __uploadPicture = async () => {
    setIsUploading(true);
    try {
      if (capturedImage) {
        const fileId = `${new Date().toISOString()}-${user?.uid}`;
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", capturedImage.uri, true);
          xhr.send(null);
        });

        const up = await uploadByte({
          child: "userUpload",
          fileName: fileId,
          file: blob,
        });

        const url = await getUrl(up.ref.fullPath);
        const data = {
          file_id: up.metadata.fullPath,
          kota_id: useDocRef(FIRESTORE_ENTITY.kota.key, param.cityId),
          like: 0,
          file_url: url,
          user_id: useDocRef(FIRESTORE_ENTITY.pengguna.key, param?.userId),
          quest_id: param.questId,
          is_accepted: false,
          wisata_id: param.wisataId,
          waktu_unggah: serverTimestamp(),
        };

        if (user?.uid) {
          addDoc(collection(db, "user-upload"), data)
            .then(() => {
              Toast.show({
                type: "success",
                text1: "Sukses!",
                text2: "Berhasil Mengunggah gambar.",
              });
              setIsUploading(false);
            })
            .catch((error) => {
              throw new Error("error firestore");
            });
        } else {
          throw new Error("error uid not found");
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Gagal Mengunggah gambar.",
      });
      setIsUploading(false);
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          onRetake={__retakePicture}
          onUpload={__uploadPicture}
          isUploading={isUploading}
        />
      ) : (
        <Camera
          // useCamera2Api={true}
          style={styles.camera}
          type={type}
          ref={(r) => {
            camera = r!!;
          }}
          ratio="16:9"
        >
          <StyledView className="flex-row mt-auto pb-6 justify-center">
            <StyledTouchableOpacity
              onPress={__takePicture}
              className="h-16 w-16 bg-white rounded-full"
            />

            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
          </StyledView>
        </Camera>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS["bg-main"],
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
