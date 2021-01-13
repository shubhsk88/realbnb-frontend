import { Header } from "../components/Header";
import { ReactElement } from "react";
import { CardVertical } from "../components";
import { Box, Grid } from "@chakra-ui/react";

const IndexPage = (): ReactElement => (
  <>
    <Header />
    <Box as="main" w="90vw" mx="auto" marginTop="4em">
      <Grid templateColumns="repeat(1fr, 4)" gap={1}>
        <CardVertical />
      </Grid>
    </Box>
  </>
);

export default IndexPage;
