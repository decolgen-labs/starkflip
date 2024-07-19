import LeaderboardPage from "@/layouts/Leaderboard";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Starkflip | Leaderboard",
};
const Leaderboard = () => {
  return <LeaderboardPage />;
};

export default Leaderboard;
