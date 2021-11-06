/**
 * 웹 responsive 를 대응하기 위한 hook
 * 화면 크기 변화를 계속 트래킹하여 화면 변화에 순간적으로 대응할 수 있도록 해준다.
 */

import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";

// 레이아웃 타입 선언
export type LayoutType = {
   window: {
      width: number;
      height: number;
   };
   isSmallDevice: boolean;
};

// 레이아웃 hook
// 너비가 800px 이하일경우 작은 화면이라고 함.
export default function useLayout(): LayoutType {
   const [dimensions, setDimensions] = useState<LayoutType>({
      window: Dimensions.get("window"),
      isSmallDevice: Dimensions.get("window").width < 800,
   });

   useEffect(() => {
      const callback = ({
         window,
      }: {
         window: { width: number; height: number };
      }) => {
         setDimensions({ window: window, isSmallDevice: window.width < 800 });
      };

      // react-native에서 제공되는 Dimensions 에 이벤트를 등록하여 화면 변화 트래킹
      Dimensions.addEventListener("change", callback);

      return () => Dimensions?.removeEventListener("change", callback);
   }, []);

   return dimensions;
}
