import React from "react";
import { useRouter } from "next/router";

const SavedListRoom = () => {
  const router = useRouter();
  console.log(router.query);

  return <div>Hello world</div>;
};

export default SavedListRoom;
