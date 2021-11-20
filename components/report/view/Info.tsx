import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../../constants/Colors";
import useLayout from "../../../hooks/useLayout";
import {
   MENU_ITEM_HEIGHT,
   WEB_REPORT_CONTENT_WIDTH,
} from "../../../constants/Size";
import { isWeb } from "../../../constants/Constants";
import { ImageLibraryReturn, LocationType } from "../../../types";

import { Button, ListItem, Text, View } from "../../Themed";
import Menu from "../elements/Menu";

// Prop 타입 선언
type Props = {
   locationType: LocationType;
   settingLocationType: (v: LocationType) => void;
   selectPhoto: (v: boolean) => Promise<void>;
   photo: ImageLibraryReturn;
   sendRequest: () => Promise<void>;
   addPhoto: boolean;
   settingAddPhoto: (v: boolean) => void;
};

function Info({
   locationType,
   settingLocationType,
   selectPhoto,
   photo,
   sendRequest,
   addPhoto,
   settingAddPhoto,
}: Props) {
   const layout = useLayout();

   // 이 element에서 사용할 window width를 작은 화면이냐, 웹이냐에 따라 다르게 정의
   // 이 width에 맞춰 이미지 크기를 조절한다.
   const width =
      isWeb && !layout.isSmallDevice
         ? WEB_REPORT_CONTENT_WIDTH
         : layout.window.width;
   const IMAGE_WIDTH: number = width * 0.8;
   const IMAGE_HEIGHT: number = ((width * 0.8) / 4) * 3;

   // 사진 등록을 눌렀을때 호출되는 콜백
   // addPhoto를 true로 바꾸고, selectPhoto를 호출하여 사진을 고르도록 한다.
   const onPressAddPhoto = () => {
      settingAddPhoto(true);
      selectPhoto(addPhoto);
   };

   return (
      <ScrollView style={styles.container}>
         <ListItem containerStyle={styles.listItem}>
            <View style={styles.listItemHeader}>
               <Text>타입</Text>
            </View>
            <View>
               <Menu
                  locationType={locationType}
                  settingLocationType={settingLocationType}
               />
            </View>
         </ListItem>
         <ListItem containerStyle={styles.listItem}>
            <View style={styles.listItemHeader}>
               <Text>사진</Text>
            </View>
            <View style={styles.selectAddButtonContainer}>
               <Button
                  title={photo && addPhoto ? "변경하기" : "등록하기"}
                  color={
                     addPhoto ? Colors.colorSet.stBlue : Colors.colorSet.stGray
                  }
                  containerStyle={{ height: 50 }}
                  buttonStyle={{ height: 50 }}
                  onPress={onPressAddPhoto}
               />
               <Button
                  title="등록안함"
                  color={
                     !addPhoto ? Colors.colorSet.stRed : Colors.colorSet.stGray
                  }
                  buttonStyle={{ height: 50 }}
                  containerStyle={{ height: 50, marginLeft: 50 }}
                  onPress={() => settingAddPhoto(false)}
               />
            </View>
         </ListItem>
         <View style={[styles.imageContainer, { height: IMAGE_HEIGHT }]}>
            {addPhoto && !photo?.cancelled && photo?.uri && (
               <Image
                  source={{ uri: photo.uri }}
                  containerStyle={{
                     width: IMAGE_WIDTH,
                     height: IMAGE_HEIGHT,
                     borderRadius: 40,
                  }}
               />
            )}
         </View>
         <View style={styles.reportContainerView}>
            <Button
               title="요청 보내기"
               containerStyle={styles.reportContainer}
               color={Colors.colorSet.stGray}
               onPress={sendRequest}
            />
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: "100%",
   },
   listItem: {
      height: 70,
      backgroundColor: "black",
   },
   listItemHeader: {
      width: 80,
   },
   selectAddButtonContainer: {
      width: "100%",
      height: MENU_ITEM_HEIGHT,
      flexDirection: "row",
   },
   imageContainer: {
      width: "100%",
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   reportContainerView: {
      width: "100%",
      alignItems: "center",
      marginTop: 20,
   },
   reportContainer: {
      width: 120,
   },
});

export default Info;
