import React, { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { deltas } from "../../../constants/Constants";
import { RootState } from "../../../modules";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import {
   CoordType,
   ImageLibraryReturn,
   LocationType,
   RootStackScreenProps,
   SMOKE,
} from "../../../types";
import Report from "../view/Report";
import * as ImagePicker from "expo-image-picker";
import Alert from "../../elements/Alert";
import { changePhotoContent } from "../../../constants/Strings";

function ReportContainer({ navigation }: RootStackScreenProps<"Report">) {
   const [position, setPosition] = useState<number>(0); // 현재 페이지
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>; // 지도 reference
   const pagerRef = useRef<FlatList>() as React.RefObject<FlatList>; // 페이지 reference
   const myLocation = useSelector(({ myLocation }: RootState) => myLocation); // 현재 유저의 위치
   const [locationType, setLocationType] = useState<LocationType>(SMOKE); // 유저가 고른 location type
   const [photo, setPhoto] = useState<ImageLibraryReturn>(null); // 유저가 고른 사진
   const [prevPhoto, setPrevPhoto] = useState<ImageLibraryReturn>(null); // 유저가 사진을 변경했을시, 변경 전 사진
   const [addPhoto, setAddPhoto] = useState(false); // 사진을 넣었는지 안넣었는지

   const [region, setRegion] = useState<Region>(myLocation.region); // 현재 지도의 중심
   const dispatch = useDispatch();

   // 두번째 페이지에서 사용되는 location type 설정 함수
   const settingLocationType = (v: LocationType) => {
      setLocationType(v);
   };

   // 사진 등록/미등록 여부 설정 함수
   const settingAddPhoto = (v: boolean) => {
      setAddPhoto(v);
   };

   // 사진 고르기
   const pickPhoto = async () => {
      // 권한 얻기
      let res = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!res.granted) {
         res = await ImagePicker.requestMediaLibraryPermissionsAsync(false);
         if (!res.granted) {
            return;
         }
      }

      // 사진 얻기
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 0.5,
         base64: true,
      });

      // 취소 됐으면 이전 사진을, 아니면 결과를 넣는다.
      if (!result.cancelled) {
         // 프로필 사진 수정
         setPhoto(result);
      } else {
         setPhoto(prevPhoto);
      }
   };

   // 유저가 사진 등록버튼을 눌렀을때, 이전에 선택된 사진이 있으면 변경할 것인지 묻기
   const selectPhoto = async (v: boolean) => {
      if (!photo) {
         await pickPhoto();
      } else if (v) {
         Alert(
            "",
            changePhotoContent,
            () => {},
            () => {
               pickPhoto();
               setPrevPhoto(photo);
               setPhoto(null);
            }
         );
      }
   };
   /**
    * 페이지 스크롤 함수
    */
   const scrollToIndex = (to: number) => {
      pagerRef.current?.scrollToIndex({
         index: to,
         animated: true,
         viewPosition: 0,
      });
      setPosition(to);
   };

   // 추가 요청 서버로 보내기.
   const sendRequest = async () => {
      dispatch(loading());
      try {
         const obj = {
            type: locationType,
            latitude: region.latitude,
            longitude: region.longitude,
            image: addPhoto ? photo?.base64 : null,
         };
         // 서버 요청
         goNext();
      } catch (e) {
         // 요청 실패시 snackbar로 안내.
         dispatch(setSnackbar("요청에 실패했습니다. 다시 시도해주세요."));
      }
      dispatch(unloading());
   };

   // 메인 화면으로 이동
   const gotoHome = () => {
      scrollToIndex(0);
      navigation.navigate("Main");
   };

   // 초기 추가요청 화면으로 이동 및 초기화
   const gotoReport = () => {
      // 초기화
      setPhoto(null);
      setAddPhoto(false);
      setLocationType(SMOKE);
      // 이동
      scrollToIndex(0);
   };

   /**
    * 다음 페이지, 이전 페이지 이동 함수
    */
   const goNext = useCallback((): void => {
      scrollToIndex(position + 1);
   }, [pagerRef, position]);
   const goPrev = useCallback((): void => {
      scrollToIndex(position - 1);
   }, [pagerRef, position]);

   // 지도를 눌렀을때 그쪽으로 이동 및 region 세팅 함수.
   // 웹일 경우 animateToRegion이 작동하지 않아, 애니메이션없이 세팅만 해준다.
   const onPressMap = (coordinate: CoordType) => {
      setRegion({ ...coordinate, ...deltas });
   };

   return (
      <Report
         region={region}
         mapViewRef={mapViewRef}
         pagerRef={pagerRef}
         position={position}
         locationType={locationType}
         photo={photo}
         addPhoto={addPhoto}
         selectPhoto={selectPhoto}
         settingLocationType={settingLocationType}
         settingAddPhoto={settingAddPhoto}
         sendRequest={sendRequest}
         goNext={goNext}
         goPrev={goPrev}
         onPressMap={onPressMap}
         gotoReport={gotoReport}
         gotoHome={gotoHome}
      />
   );
}

export default ReportContainer;
