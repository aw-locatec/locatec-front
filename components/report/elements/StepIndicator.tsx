/**
 * 페이지 상단에 있는 페이지 indicator element
 */

import React from "react";
import { View } from "react-native";

import DefaultStepIndicator from "react-native-step-indicator";
import useLayout from "../../../hooks/useLayout";
import { WEB_REPORT_CONTENT_WIDTH } from "../../../constants/Size";
import { report_stepIndicator } from "../../../constants/Strings";
import { isWeb } from "../../../constants/Constants";

// indicator 에 있는 라벨 문자열 배열
const labels: string[] = report_stepIndicator;

// indicator 스타일.
// react-native-step-indicator 공식문서에 있는 예제 스타일이 괜찮아서 그대로 사용중
const customStyles = {
   stepStrokeFinishedColor: "#2196f3",
   stepIndicatorLabelFinishedColor: "#ffffff",
   separatorFinishedColor: "#2196f3",
   stepIndicatorFinishedColor: "#2196f3",

   stepStrokeWidth: 3,
   stepStrokeCurrentColor: "#2196f3",
   stepIndicatorCurrentColor: "#ffffff",
   stepIndicatorLabelCurrentColor: "#2196f3",
   currentStepLabelColor: "#2196f3",

   stepStrokeUnFinishedColor: "#aaaaaa",
   separatorUnFinishedColor: "#aaaaaa",
   stepIndicatorUnFinishedColor: "#ffffff",
   stepIndicatorLabelUnFinishedColor: "#aaaaaa",
   labelColor: "#999999",
};

// props 타입 선언
type Props = {
   position: number;
};

function StepIndicator({ position }: Props) {
   const layout = useLayout();

   // 웹 화면일 경우 800, 작은 화면일경우 좌우 전체 px, native 환경일경우 100% 차지하도록함.
   return (
      <View
         style={{
            width: isWeb
               ? layout.isSmallDevice
                  ? layout.window.width
                  : WEB_REPORT_CONTENT_WIDTH
               : "100%",
            height: 70,
            marginTop: 20,
            marginBottom: 0,
         }}>
         <DefaultStepIndicator
            customStyles={customStyles}
            currentPosition={position}
            labels={labels}
            stepCount={labels.length}
         />
      </View>
   );
}

export default StepIndicator;
