import React from "react";
import { useRouter } from "next/router";
import { ListDetailsCard } from "@/components/ListDetailsCard";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import { Heading, IconButton } from "@chakra-ui/react";
import { Room, useGetUserListsQuery } from "@/generated";

const SavedListRoom = () => {
  const router = useRouter();
  const { savedId } = router.query;
  const { data, error, loading } = useGetUserListsQuery();
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const list = data.getList?.lists.find((list) => list.id === savedId);

  return (
    <div>
      <IconButton
        _hover={{ background: "gray.100" }}
        aria-label="Back Button"
        padding={4}
        borderRadius="full"
        mb={8}
        mt={4}
        background="white"
        icon={<IoChevronBackOutline size="40px" />}
        onClick={() => router.push("/saved")}
      />
      {list ? (
        <>
          <Heading fontSize="3xl" my={4} mx={4}>
            {list.name}
          </Heading>
          {list.rooms.length > 0 ? (
            list.rooms.map((room) => (
              <Link href={`/rooms/${room.id}`} key={room.id}>
                <a>
                  <ListDetailsCard room={room as Room} />
                </a>
              </Link>
            ))
          ) : (
            <div> There is no favourites here</div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SavedListRoom;
