import React from "react";
import { scale } from "@md/utils";
import { useAlbums } from "@md/hooks/app";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

interface AlbumItemProps {
  item: Album;
  gap: number;
  index: number;
  onPressItem: (item: Album) => void;
  selectedIndex: Animated.DerivedValue<number>;
}

export default function AlbumItem({
  item,
  gap,
  index,
  onPressItem,
  selectedIndex,
}: AlbumItemProps) {
  const albums = useAlbums();
  const { width, height } = useWindowDimensions();
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      selectedIndex.value,
      [index - 1, index, index + 1],
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={style}>
      <Pressable
        onPress={() => onPressItem(item)}
        style={{
          width: width * 0.6,
          marginLeft: index === 0 ? gap * 2 : 0,
          marginRight: index === albums.length - 1 ? gap * 2 : 0,
        }}
      >
        <View style={{ height: height * 0.3 }}>
          <MaterialIcons
            name="folder"
            size={scale(210)}
            color="rgb(78, 79, 83)"
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { justifyContent: "flex-end", left: 30, bottom: 70, right: 30 },
            ]}
          >
            <Text
              style={{
                fontWeight: "300",
                fontSize: scale(10),
                color: "rgb(178, 181, 187)",
              }}
            >
              50 ARCHIVOS
            </Text>
            <Text
              style={{
                color: "#FFF",
                fontWeight: "600",
                fontSize: scale(14),
                textTransform: "capitalize",
              }}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
