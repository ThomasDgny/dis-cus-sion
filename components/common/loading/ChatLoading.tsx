import React from "react";
import { StageSpinner } from "react-spinners-kit";

export default function ChatLoading() {
  return (
    <div className="flex h-screen justify-center">
      <StageSpinner size={60} color="#000" />
    </div>
  );
}
