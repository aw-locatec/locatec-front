import React from "react";
import Colors from "../../../constants/Colors";
import { smokingPlace, trashcan } from "../../../constants/Strings";
import { LocationType, SMOKE, TRASHCAN } from "../../../types";
import { CustomSpeedDial } from "./CustomButtons";

type Props = {
   isOpen: boolean;
   locationType: LocationType;
   toggleIsOpen: () => void;
   changeLocationType: (v: LocationType) => void;
};

function RightBottomSpeedDial({
   isOpen,
   locationType,
   toggleIsOpen,
   changeLocationType,
}: Props) {
   return (
      <CustomSpeedDial
         isOpen={isOpen}
         icon={{ name: locationType, color: "#fff", type: "font-awesome-5" }}
         openIcon={{ name: "close", color: "#fff" }}
         onOpen={toggleIsOpen}
         onClose={toggleIsOpen}
         color={Colors.colorSet.stGray}
         actions={[
            {
               icon: {
                  name: "smoking",
                  color: "#fff",
                  type: "font-awesome-5",
               },
               title: smokingPlace,
               onPress: () => changeLocationType(SMOKE),
            },
            {
               icon: {
                  name: "trash",
                  color: "#fff",
                  type: "font-awesome-5",
               },
               title: trashcan,
               onPress: () => changeLocationType(TRASHCAN),
            },
         ]}
      />
   );
}

export default RightBottomSpeedDial;
