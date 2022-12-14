import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useState } from "react";

import { COLORS } from "@config/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyledImageBackground,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@components/styled";
import { useStorage } from "@utils/useStorage";

const { uploadByte } = useStorage()

const CameraPreview = ({
  photo,
  onRetake,
}: {
  photo: CameraCapturedPicture;
  onRetake: () => void;
}) => {
  return (
    <StyledView className="flex-1 w-full h-full">
      <StyledImageBackground
        source={{ uri: photo && photo.uri }}
        className="flex-1"
      >
        <StyledView className="flex-row mt-auto mb-4 py-5 bg-white justify-around">
          <StyledTouchableOpacity onPress={onRetake} className="">
            <StyledText>Ambil Ulang</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity className="">
            <StyledText>Simpan</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledImageBackground>
    </StyledView>
  );
};

export default function CameraScreen({ }) {
  let camera: Camera;
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setCapturedImage(photo);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
  };

  const __uploadPicture = () => {
    if (capturedImage) {
      uploadByte({ child: 'userUpload', file: capturedImage.uri })
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
        <CameraPreview photo={capturedImage} onRetake={__retakePicture} />
      ) : (
        <Camera
          useCamera2Api={true}
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
