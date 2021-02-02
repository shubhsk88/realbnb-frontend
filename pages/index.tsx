import { ReactElement } from "react";
import { GetStaticProps } from "next";

import { SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

import { GetRoomsDocument, useGetRoomsQuery } from "@/generated";
import { initializeApollo } from "@/lib/apolloClient";
import { VRoomCard } from "@/components";

const IndexPage = (): ReactElement => {
  const { loading, data, error } = useGetRoomsQuery({
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const {
    getRooms: { rooms, error: serverError },
  } = data;
  if (serverError) return <div> {serverError}</div>;

  return (
    <SimpleGrid w="100%" minChildWidth="320px" spacing={6}>
      {rooms.map((room) => (
        <VRoomCard key={room.id} room={room} />
      ))}
    </SimpleGrid>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GetRoomsDocument,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default IndexPage;
