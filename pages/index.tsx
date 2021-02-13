import { ReactElement } from "react";
import { GetStaticProps } from "next";

import { SimpleGrid } from "@chakra-ui/react";

import { GetRoomsDocument, Room, useGetRoomsQuery } from "@/generated";
import { initializeApollo } from "@/lib/apolloClient";
import { VRoomCard } from "@/components";
import { ListCardEmpty } from "@/components/ListCardEmpty";

const IndexPage = (): ReactElement => {
  const { loading, data, error } = useGetRoomsQuery({
    fetchPolicy: "cache-and-network",
  });

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const {
    getRooms: { rooms, error: serverError },
  } = data;
  if (serverError) return <div> {serverError}</div>;

  return (
    <>
      {loading ? (
        <SimpleGrid w="100%" minChildWidth="300px" spacing={14}>
          {" "}
          {Array.from(Array(5).keys()).map((emptyState) => (
            <ListCardEmpty key={emptyState} />
          ))}
        </SimpleGrid>
      ) : null}
      <SimpleGrid w="100%" minChildWidth="320px" spacing={6}>
        {rooms.map((room) => (
          <VRoomCard key={room.id} room={room as Room} />
        ))}
      </SimpleGrid>
    </>
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
