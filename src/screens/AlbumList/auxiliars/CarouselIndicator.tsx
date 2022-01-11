import _ from "lodash";
import React from "react";
import { useAlbums } from "@md/hooks/app";
import { useWindowDimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const Dot = ({
  index,
  selectedIndex,
}: {
  index: number;
  selectedIndex: Animated.DerivedValue<number>;
}) => {
  const styles = useAnimatedStyle(() => {
    const color = interpolateColor(
      selectedIndex.value,
      [index - 1, index, index + 1],
      ["transparent", "rgb(113, 115, 120)", "transparent"]
    );
    const opacity = interpolate(
      selectedIndex.value,
      [index - 3, index, index + 3],
      [0.5, 1, 0.5]
    );

    const scale = interpolate(
      selectedIndex.value,
      [index - 1, index, index + 1],
      [0.7, 1, 0.7],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
      backgroundColor: color,
    };
  });

  return (
    <Animated.View
      style={[
        styles,
        {
          width: 8,
          height: 8,
          marginRight: 5,
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "rgb(113, 115, 120)",
        },
      ]}
    />
  );
};

const CarouselIndicator: React.FC<{
  selectedIndex: Animated.DerivedValue<number>;
}> = ({ selectedIndex }) => {
  const albums = useAlbums();
  const { width } = useWindowDimensions();

  const styles = useAnimatedStyle(() => {
    const translateX = interpolate(
      selectedIndex.value,
      [0, albums.length],
      [width * 2 - (5 + 8) * 10, (width * 2 - (5 + 8) * 10) * -1]
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles,
        {
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: "row",
          position: "absolute",
          justifyContent: "center",
        },
      ]}
    >
      {albums.map((_: any, index: number) => {
        return (
          <Dot
            index={index}
            key={`dot__${index}`}
            selectedIndex={selectedIndex}
          />
        );
      })}
    </Animated.View>
  );
};

export default CarouselIndicator;
