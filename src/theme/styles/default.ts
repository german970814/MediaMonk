import { getConstants } from "..";
import { StyleSheet } from "react-native";

const constants = getConstants();
// box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
export default StyleSheet.create({
  text: { color: "#000" },
  borderRadius: { borderRadius: 24 },
  basicShadow: {
    elevation: 2,
    shadowRadius: 7.77,
    shadowOpacity: 3.33,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 4, height: 4 },
  },
  headerTitleText: { fontSize: 16, fontWeight: "500" },
  backgroundColor: { backgroundColor: constants.backgroundColor },
  appHorizontalSpacer: {
    marginHorizontal: constants.APP_HORIZONTAL_SPACE,
  },
  appHorizontalSpacerPadding: {
    paddingHorizontal: constants.APP_HORIZONTAL_SPACE,
  },
  error: { color: "#F81E1E" },
  textContrast: { color: "#5A5A5A" },
  errorText: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: "300",
    // fontSize: sizes.fonts.caption,
    // fontFamily: fonts.Muli.regular,
  },
  labelSpacer: { marginBottom: 15 },
  spacer: { marginBottom: 25, marginTop: 10 },
  label: {
    color: constants.textInactiveColor,
    // fontFamily: fonts.Muli.semiBold,
    // fontSize: sizes.fonts.subheading - 1,
  },
  sublabel: {
    color: "#484848",
    // fontFamily: fonts.Muli.regular,
    // fontSize: sizes.fonts.subheading - 1,
  },
  fieldDescription: {
    color: "#AAA9A9",
    // fontSize: sizes.fonts.body,
    // fontFamily: fonts.Muli.regular,
  },
  background: {
    borderRadius: 4,
    backgroundColor: "#E9E9EA",
  },
});
