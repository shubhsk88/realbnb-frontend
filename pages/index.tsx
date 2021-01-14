import { Header } from "../components/Header";
import { ReactElement } from "react";
import { CardVertical } from "../components";
import { Box, Grid } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps } from "next";
import { ssrGetRooms } from "../generated/page";

interface PageProps {
  data: Record<string, unknown>;
}

const IndexPage = ({ data }: PageProps): ReactElement => {
  console.log(data);

  return (
    <>
      <Header />
      <Box as="main" w="90vw" mx="auto" marginTop="4em">
        <Grid templateColumns="repeat(1fr, 4)" gap={1}>
          <CardVertical />
        </Grid>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  await ssrGetRooms.getServerPage({}, ctx);

export default IndexPage;
