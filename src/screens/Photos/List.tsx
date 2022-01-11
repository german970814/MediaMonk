import _ from "lodash";
import React from "react";
import { scale } from "@md/utils";
import useTheme from "@md/hooks/theme";
import Header from "@components/Header";
import { Text, View } from "react-native";
import Container from "@components/Container";
import { useWindowDimensions } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Image, RefreshControl, ScrollView } from "react-native";
import { useGetPhotos, usePhotosFromAlbum } from "@md/hooks/app";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLUMNS = 2;

interface PhotoListScreenProps {
  route: RouteProp<RootParamList, "PhotoList">;
}

export default function PhotoListScreen(props: PhotoListScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { album } = props.route.params;
  const { width } = useWindowDimensions();
  const photos = usePhotosFromAlbum(album);
  const { loading } = useGetPhotos(album, !photos?.length);

  return (
    <Container edges={["top"]}>
      <Header margins />
      <ScrollView
        contentContainerStyle={[
          { paddingBottom: insets.bottom },
          theme.styles.appHorizontalSpacerPadding,
        ]}
        refreshControl={
          <RefreshControl
            size={14}
            tintColor="#FFF"
            refreshing={loading}
            onRefresh={() => {}}
          />
        }
      >
        <Text
          style={{
            color: "#FFF",
            fontWeight: "bold",
            fontSize: scale(18),
            textTransform: "capitalize",
          }}
        >
          {album.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {Array.apply(null, { length: COLUMNS } as any).map((__, index) => (
            <View
              key={`column__${index}`}
              style={{
                width: (width - 40) / 2,
                marginLeft: (index + 1) % 2 === 0 ? 10 : 0,
              }}
            >
              {_.map(
                _.slice(
                  photos,
                  index * (photos!.length / COLUMNS),
                  (index + 1) * (photos!.length / COLUMNS)
                ),
                (item, _index) => (
                  <ItemImage photo={item} key={item.id.toString()} />
                )
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}

const ItemImage: React.FC<{ photo: Photo }> = ({ photo }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const ratio = React.useMemo(() => _.random(0.4, 0.9, true), []);

  return (
    <View
      style={{
        marginTop: 10,
        borderRadius: 20,
        aspectRatio: ratio,
        backgroundColor: "gray",
        width: (width - theme.constants.APP_HORIZONTAL_SPACE) / 2 - 20,
      }}
    >
      <Image
        source={{ uri: photo.url }}
        style={{ height: "100%", width: "100%", borderRadius: 20 }}
      />
    </View>
  );
};
