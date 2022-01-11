import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Container: React.FC<
  Omit<React.ComponentProps<typeof ImageBackground>, "source"> & {
    variant?: number;
    edges?: React.ComponentProps<typeof SafeAreaView>["edges"];
  }
> = ({ children, variant = 1, edges = ["top", "bottom"], ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={{
        flex: 1,
        paddingTop: edges.find((item) => item === "top") ? insets.top : 0,
        paddingBottom: edges.find((item) => item === "bottom")
          ? insets.bottom
          : 0,
      }}
    >
      <LinearGradient
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={StyleSheet.absoluteFillObject}
        colors={["rgb(64, 65, 66)", "rgb(16, 19, 25)"]}
      />
      {children}
    </View>
  );
};

export default Container;
