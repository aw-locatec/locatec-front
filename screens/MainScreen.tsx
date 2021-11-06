import React from "react";
import MainContainer from "../components/main/container/MainContainer";
import { RootStackScreenProps } from "../types";

export default function MainScreen(props: RootStackScreenProps<"Main">) {
   return <MainContainer {...props} />;
}
