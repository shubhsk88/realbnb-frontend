import { Header } from "../components/Header";
import { ReactElement } from "react";
import { CardVertical } from "../components";
import { Box, Grid } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { GetRoomsDocument, useGetRoomsQuery } from "../generated";
import { initializeApollo } from "../lib/apolloClient";

interface PageProps {
  data: Record<string, unknown>;
}

const IndexPage = (props: PageProps): ReactElement => {
  const { loading, data, error } = useGetRoomsQuery();
  if (loading) return <div> loading</div>;
  const {
    getRooms: { rooms, error: serverError },
  } = data;
  if (serverError) return <div> {serverError}</div>;
  return (
    <div>
      <Header />
      <Box as="main" w="90vw" mx="auto" marginTop="4em">
        <Grid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap="2rem"
        >
          {rooms.map((room) => (
            <CardVertical key={room.id} room={room} />
          ))}
        </Grid>
      </Box>
    </div>
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
