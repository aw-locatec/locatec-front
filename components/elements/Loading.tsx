import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { View } from "../Themed";

export default function Loading() {
   // 리덕스 store로부터 loading 상태 불러들이기.
   const loading = useSelector(({ loading }: RootState) => loading);

   // loading 중일땐 전체 꽉차는 로딩 화면을 보여줌.
   return (
      <>
         {loading ? (
            <View
               style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  zIndex: 10,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  justifyContent: "center",
                  alignItems: "center",
               }}>
               <AnimatedLottieView
                  source={require("../../assets/animations/loading.json")}
                  autoPlay
                  loop
                  colorFilters={[
                     {
                        keypath: "button",
                        color: "#Ffffff",
                     },
                     {
                        keypath: "Sending Loader",
                        color: "#Ffffff",
                     },
                  ]}
                  style={{ width: 200, height: 200 }}
               />
            </View>
         ) : (
            <></>
         )}
      </>
   );
}
