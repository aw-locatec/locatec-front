import * as React from "react";
import ReportContainer from "../components/report/container/ReportContainer";
import { RootStackScreenProps } from "../types";

export default function ReportScreen(props: RootStackScreenProps<"Report">) {
   return <ReportContainer {...props} />;
}
