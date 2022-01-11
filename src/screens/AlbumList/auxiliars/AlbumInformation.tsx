import React from "react";
import { scale } from "@md/utils";
import { Text, useWindowDimensions, View } from "react-native";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";

const INFO_TAGS = [
  {
    title: "Fotos",
    color: "rgb(124, 241, 252)",
    description: "50 Archivos / 2.3MB",
    logo: () => <Ionicons name="image-outline" />,
  },
  {
    title: "Videos",
    color: "rgb(213, 192, 170)",
    description: "50 Archivos / 2.3MB",
    logo: () => <Ionicons name="videocam-outline" />,
  },
  {
    title: "Audio",
    color: "rgb(168, 158, 212)",
    description: "50 Archivos / 2.3MB",
    logo: () => <AntDesign name="sound" />,
  },
  {
    title: "Notas",
    color: "rgb(112, 146, 110)",
    description: "50 Archivos / 2.3MB",
    logo: () => <Feather name="book" />,
  },
  {
    title: "Documentos",
    color: "rgb(196, 196, 196)",
    description: "50 Archivos / 2.3MB",
    logo: () => <AntDesign name="filetext1" />,
  },
  {
    title: "Favoritos",
    description: "50 Archivos / 2.3MB",
    logo: () => <AntDesign name="staro" />,
  },
];

const AlbumInformation: React.FC<{}> = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={{ marginHorizontal: 20, marginTop: 40 }}>
      <Text style={{ color: "rgb(178, 181, 187)" }}>CATEGORIAS</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {INFO_TAGS.map((item) => {
          const Logo = React.cloneElement(item.logo(), {
            color: "#FFF",
            size: scale(22),
          });

          return (
            <View
              key={item.title}
              style={{
                marginTop: 25,
                alignItems: "center",
                flexDirection: "row",
                width: (width - 50) / 2,
              }}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 15,
                  alignItems: "center",
                  borderColor: item.color,
                  justifyContent: "center",
                  borderLeftWidth: !!item.color ? 2 : 0,
                  backgroundColor: !item.color
                    ? "rgb(213, 192, 170)"
                    : "rgb(78, 79, 83)",
                }}
              >
                {Logo}
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ color: "rgb(178, 181, 187)" }}>
                  {item.description}
                </Text>
                <Text style={{ color: "#FFF" }}>{item.title}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AlbumInformation;
