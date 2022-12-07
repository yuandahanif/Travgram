import { useMemo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { View, Image, ImageSourcePropType } from "react-native";

interface Props {
  stickerSource?: ImageSourcePropType;
  imageSize: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  
  const onDoubleTap = useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(250)
        .numberOfTaps(2)
        .onEnd((_event, success) => {
          if (success && scaleImage.value) {
            scaleImage.value = scaleImage.value * 2;
          }
        }),
    []
  );

  const onDrag = useMemo(
    () =>
      Gesture.Pan().onUpdate((e) => {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      }),
    // .onStart((e) => {
    //   e.translationX += translateX.value;
    //   e.translationY += translateY.value;
    // }),
    // .onStart((event) => {
    //   event.translationX = translateX.value;
    //   event.translationY = translateY.value;
    // })
    []
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage?.value),
      height: withSpring(scaleImage?.value),
    };
  });

  return (
    <GestureDetector gesture={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={onDoubleTap}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </AnimatedView>
    </GestureDetector>
  );
}
