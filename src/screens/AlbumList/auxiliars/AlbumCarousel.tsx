import _ from "lodash";
import React from "react";
import { scale } from "@md/utils";
import AlbumItem from "./AlbumItem";
import { useAlbums } from "@md/hooks/app";
import CarouselIndicator from "./CarouselIndicator";
import { Text, View, useWindowDimensions } from "react-native";
import { useAnimatedScrollHandler } from "react-native-reanimated";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";

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
        <AlbumItem
          gap={GAP}
          item={item}
          index={index}
          onPressItem={onPressItem}
          selectedIndex={selectedIndex}
        />
      );
    },
    [onPressItem, albums.length]
  );

  const renderEmpty = React.useCallback(() => {
    return (
      <View
        style={{
          width,
          height: height * 0.3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: scale(12),
            color: "rgb(178, 181, 187)",
          }}
        >
          En este momento no hay albumes para mostrar
        </Text>
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
