import MyHistoryPage from "@/layouts/MyHistory";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Starkflip | My History",
};
const MyHistory = () => {
  return <MyHistoryPage />;
};

export default MyHistory;
