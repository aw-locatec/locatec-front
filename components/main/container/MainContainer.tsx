import React from "react";
import { RootStackScreenProps } from "../../../types";
import Main from "../view/Main";

function MainContainer({}: RootStackScreenProps<"Main">) {
   return <Main />;
}

export default MainContainer;
