import React from "react";
import useTheme from "@md/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

export const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: HEADER_HEIGHT,
  },
});

interface HeaderProps {
  title?: string;
  border?: boolean;
  margins?: boolean;
  translate?: boolean;
  backIconColor?: string;
  onBackPress?: () => void;
  titleStyles?: StyleProp<TextStyle>;
  getIconComponent?: () => React.ReactNode;
  renderLeftComponent?: () => React.ReactNode;
  renderRightComponent?: () => React.ReactNode;
  renderCenterComponent?: () => React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  border,
  margins,
  onBackPress,
  titleStyles,
  backIconColor,
  getIconComponent,
  renderLeftComponent,
  renderRightComponent,
  renderCenterComponent,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const IconComponent = getIconComponent?.() ?? (
    <Ionicons color="#000" name="chevron-back-outline" />
  );

  const onPressBack = React.useCallback(() => {
    onBackPress?.();
    !onBackPress && navigation.goBack();
  }, [onBackPress]);

  return (
    <View
      style={[
        border && { borderBottomWidth: 1, borderBottomColor: "#CFD6E1" },
        margins && theme.styles.appHorizontalSpacerPadding,
        styles.container,
      ]}
    >
      <View
        style={{
          left: 0,
          right: 0,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderCenterComponent?.() ??
          (!!title && (
            <Text style={[theme.styles.headerTitleText, titleStyles]}>
              {title}
            </Text>
          ))}
      </View>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        {renderLeftComponent?.() ??
          React.cloneElement(IconComponent as any, {
            size: 24,
            color: backIconColor,
            onPress: onPressBack,
          })}
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        {renderRightComponent?.()}
      </View>
    </View>
  );
};

export default Header;
