import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setTheme } from "./modules/theme";
import { LIGHT, MarkerType, SMOKE, TRASHCAN } from "./types";
import { View, ViewProps } from "./components/Themed";
import { setMarkers } from "./modules/markers";
import getMyRegion from "./utils/getMyRegion";
import { deltas } from "./constants/Constants";
import { setMyLocation } from "./modules/myLocation";

const tempDatas: MarkerType[] = [
   {
      type: TRASHCAN,
      coords: {
         latitude: 37.630682295065505,
         longitude: 127.0804025572257,
      },
      image: "https://www.costco.co.kr/medias/sys_master/images/hb9/hb8/15318005022750.jpg",
   },
   {
      type: SMOKE,
      coords: {
         latitude: 37.629635550859,
         longitude: 127.08086267102873,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
   {
      type: SMOKE,
      coords: {
         latitude: 37.63133962861005,
         longitude: 127.07673969062887,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
   {
      type: TRASHCAN,
      coords: {
         latitude: 37.63311154223848,
         longitude: 127.07690659454285,
      },
      image: "https://www.costco.co.kr/medias/sys_master/images/hb9/hb8/15318005022750.jpg",
   },
   {
      type: SMOKE,
      coords: {
         latitude: 37.633976049288925,
         longitude: 127.08052886291345,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
   {
      type: TRASHCAN,
      coords: {
         latitude: 37.634836974008856,
         longitude: 127.07739828481888,
      },
      image: "https://www.costco.co.kr/medias/sys_master/images/hb9/hb8/15318005022750.jpg",
   },
   {
      type: SMOKE,
      coords: {
         latitude: 37.6349341635446,
         longitude: 127.07542743118924,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
];

function AppInit({ children }: ViewProps) {
   const [isLoadingComplete, setLoadingComplete] = useState(false); // 로딩 상태
   const dispatch = useDispatch(); // 리덕스 action 디스패치 함수

   const loadResourcesAndDataAsync = async () => {
      try {
         // 폰트 로드
         await Font.loadAsync({
            notosans: require("./assets/fonts/NotoSansKR-Regular.otf"),
         });

         // 테마 읽기.
         let theme = await AsyncStorage.getItem("theme");
         if (!theme) {
            await AsyncStorage.setItem("theme", LIGHT);
            theme = LIGHT;
         }
         dispatch(setTheme(theme));

         // 위치 데이터 불러들이기.
         const processed = tempDatas.map((item) => ({
            type: item.type,
            coords: {
               latitude: item.coords.latitude,
               longitude: item.coords.longitude,
            },
            image: item.image,
         }));
         dispatch(setMarkers(processed));
      } catch (e) {
         console.log(e);
      }
   };

   const onFinish = () => setLoadingComplete(true);

   useEffect(() => {
      // 로딩이 끝나면 현재 유저 위치 받기
      const myLocation = async () => {
         if (isLoadingComplete) {
            try {
               const ret = await getMyRegion();
               // 학교 외부일경우 우리 앱에선 유저의 위치가 의미가 없으므로
               // 안일때만 myLocation store에 저장함.
               if (ret.isInside) {
                  dispatch(
                     setMyLocation({
                        region: {
                           latitude: ret.parsed.latitude,
                           longitude: ret.parsed.longitude,
                           ...deltas,
                        },
                        isInside: true,
                     })
                  );
               }
            } catch (e) {
               console.log(e);
            }
         }
      };
      myLocation();
   }, [isLoadingComplete]);

   // 로딩 중일땐 AppLoading을 렌더.
   // AppLoading은 startAsync 함수가 완료될때까지 splash 화면을 렌더한다.
   // 완료시에는 onFinish를 호출하여 isLoadingComplete 상태를 true로 바꾼다.
   if (!isLoadingComplete) {
      return (
         <AppLoading
            startAsync={loadResourcesAndDataAsync}
            onFinish={onFinish}
            onError={console.warn}
         />
      );
   }

   return <View style={{ height: "100%", width: "100%" }}>{children}</View>;
}

export default AppInit;
