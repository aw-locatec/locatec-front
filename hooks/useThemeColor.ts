import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { RootState } from "../modules";

// 전역 themeColor 관리를 위한 hook
export default function useThemeColor(
   props: { light?: string; dark?: string },
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
   // 리덕스 store에서 theme 가져와서 전역 theme 상태 관리
   const theme = useSelector(({ theme }: RootState) => theme);
   const colorFromProps = props[theme];

   if (colorFromProps) {
      return colorFromProps;
   } else {
      return Colors[theme][colorName];
   }
}
