import { useRouter } from "next/router";
import { useGetRoomQuery } from "../../generated";

const RoomDetails = () => {
  const router = useRouter();
  const { query } = router;
  const id = query.roomId as string;

  const { loading, data, error } = useGetRoomQuery({ id });

  console.log(data, error);

  return <div>hello</div>;
};

export default RoomDetails;
