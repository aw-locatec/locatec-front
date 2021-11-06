// 색상 전역관리
const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const buttonBackgroundColor = "#2196f3";

export default {
   light: {
      text: "#000",
      background: "#fff",
      tint: tintColorLight,
      tabIconDefault: "#ccc",
      tabIconSelected: tintColorLight,
      buttonBackground: buttonBackgroundColor,
      buttonTitle: "black",
   },
   dark: {
      text: "#fff",
      background: "#1f1f1f",
      tint: tintColorDark,
      tabIconDefault: "#ccc",
      tabIconSelected: tintColorDark,
      buttonBackground: buttonBackgroundColor,
      buttonTitle: "white",
   },
   colorSet: {
      stRed: "rgba(185, 0, 5, 87)",
      stBlue: "rgba(10, 31, 98, 51)",
      stGray: "rgba(143,143,143, 135)",
   },
};
