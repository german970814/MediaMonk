import _ from "lodash";
import React from "react";
import { scale } from "@md/utils";
import { useAlbums } from "@md/hooks/app";
import Animated from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import CarouselIndicator from "./CarouselIndicator";
import { useSharedValue } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";
import { useAnimatedScrollHandler } from "react-native-reanimated";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const GAP = 40;

const AlbumCarousel: React.FC<{}> = () => {
  const albums = useAlbums();
  const x = useSharedValue<number>(0);
  const { width, height } = useWindowDimensions();
  const selectedIndex = useDerivedValue(() => {
    return x.value / (width * 0.6);
  });
  const scrollHandler = useAnimatedScrollHandler((event, ctx) => {
    x.value = event.contentOffset.x;
  });
  const navigation =
    useNavigation<NavigationProp<RootParamList, "AlbumList">>();

  const keyExtractor = React.useCallback((item: Album) => {
    return item.id.toString();
  }, []);

  const onPressItem = React.useCallback((item: Album) => {
    navigation.navigate("PhotoList", { album: item });
  }, []);

  const renderItem = React.useCallback(
    ({ item, index }: { item: Album; index: number }) => {
      return (
        <Pressable
          onPress={() => onPressItem(item)}
          style={{
            width: width * 0.6,
            marginLeft: index === 0 ? GAP * 2 : 0,
            marginRight: index === albums.length - 1 ? GAP * 2 : 0,
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
      );
    },
    [onPressItem, albums.length]
  );

  const renderEmpty = React.useCallback(() => {
    return (
      <View
        style={{
          height: height * 0.3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Este componente está vacío</Text>
      </View>
    );
  }, []);

  return (
    <View>
      <Animated.FlatList
        // @ts-ignore
        horizontal
        data={albums ?? []}
        decelerationRate="fast"
        renderItem={renderItem}
        onScroll={scrollHandler}
        keyExtractor={keyExtractor}
        snapToInterval={width * 0.6}
        ListEmptyComponent={renderEmpty}
        showsHorizontalScrollIndicator={false}
      />
      <CarouselIndicator selectedIndex={selectedIndex} />
    </View>
  );
};

export default AlbumCarousel;
