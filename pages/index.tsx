import { Header } from "../components/Header";
import { ReactElement } from "react";
import { CardVertical } from "../components";
import { Box, Grid } from "@chakra-ui/react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { GetRoomsDocument, useGetRoomsQuery } from "../generated";
import { initializeApollo } from "../lib/apolloClient";

export interface PageProps {
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
    <>
      <Box>
        <Grid
          gridTemplateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
          gap="2rem"
          mb={10}
        >
          {rooms.map((room) => (
            <Link href={`rooms/${room.id}`} key={room.id}>
              <a>
                <CardVertical room={room} />
              </a>
            </Link>
          ))}
        </Grid>
      </Box>
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
