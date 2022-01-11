import React from "react";
import { scale } from "@md/utils";
import Container from "@components/Container";
import AlbumCarousel from "./auxiliars/AlbumCarousel";
import { NavigationProp } from "@react-navigation/native";
import AlbumInformation from "./auxiliars/AlbumInformation";
import { useAlbumsCount, useGetAlbums } from "@md/hooks/app";
import { Text, View, RefreshControl, ScrollView } from "react-native";

interface AlbumListScreenProps {
  navigation: NavigationProp<RootParamList, "AlbumList">;
}

export default function AlbumListScreen(props: AlbumListScreenProps) {
  const albumsCount = useAlbumsCount();
  const { loading } = useGetAlbums(!albumsCount);

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            size={14}
            tintColor="#FFF"
            refreshing={loading}
            onRefresh={() => {}}
          />
        }
      >
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <Text
            style={{ color: "#FFF", fontSize: scale(18), fontWeight: "bold" }}
          >
            Albumes disponibles
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: scale(14),
              color: "rgb(178, 181, 187)",
            }}
          >
            {`${albumsCount ?? 0} Albumes`}
          </Text>
        </View>
        <AlbumCarousel />
        <View style={{ flex: 1 }}>
          <AlbumInformation />
        </View>
      </ScrollView>
    </Container>
  );
}
