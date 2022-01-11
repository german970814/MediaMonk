import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import AlbumListScreen from "@screens/AlbumList";
import PhotoListScreen from "@screens/Photos/List";

const RootStack = createNativeStackNavigator<RootParamList>();

export default () => {
  const navigationTheme: typeof DefaultTheme = React.useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: "rgb(16, 19, 25)",
      },
    };
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator
        initialRouteName="AlbumList"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="AlbumList" component={AlbumListScreen} />
        <RootStack.Screen name="PhotoList" component={PhotoListScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
