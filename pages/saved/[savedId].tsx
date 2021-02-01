import React from "react";
import { useRouter } from "next/router";
import { ListDetailsCard } from "@/components/ListDetailsCard";

const SavedListRoom = () => {
  const router = useRouter();

  return (
    <div>
      <ListDetailsCard />
    </div>
  );
};

export default SavedListRoom;
