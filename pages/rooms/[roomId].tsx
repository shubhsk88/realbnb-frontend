import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useGetRoomQuery } from "../../generated";

import { IoBedOutline } from "react-icons/io5";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  Stack,
  Select,
  GridItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { ElementType, ReactElement, ReactNode } from "react";

interface IconPairProps {
  icon: ElementType;
  children: ReactNode;
}
const IconPair = ({ icon, children }: IconPairProps) => (
  <Flex color="gray.400" fontSize="md" alignItems="center">
    <Icon as={icon} h={6} w={6} mr="0.5rem" />
    <p>{children}</p>
  </Flex>
);

interface SectionProps {
  name: string;
  children: ReactNode;
}
const Section = ({ name, children }: SectionProps) => (
  <>
    <hr />
    <Heading as="h3" size="md">
      {name}
    </Heading>
    {children}
  </>
);

const RoomDetails = (): ReactElement => {
  const router = useRouter();
  const { query } = router;
  const id = query.roomId as string;
  const { loading, data, error } = useGetRoomQuery({ variables: { id } });
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const room = data.getRoom.room;
  return (
    <>
      <Grid
        h="30vh"
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        <GridItem colSpan={3} rowSpan={2} />
        <GridItem colSpan={2} />
        {room.photos.slice(5).map((photo, index) => (
          <GridItem
            rowSpan={!index ? 2 : 1}
            colSpan={index === 1 ? 3 : 1}
            key={photo.id}
            position="relative"
          >
            <Image layout="fill" src={photo.link} />
          </GridItem>
        ))}
      </Grid>
      <Stack direction="row">
        <Info flexGrow={1}>
          <Text size="sm" fontWeight="medium" color="gray.400">
            Room Type
          </Text>
          <Heading as="h2" size="lg">
            Room Name
          </Heading>
          <IconPair icon={IoBedOutline}>2</IconPair>
          <Section name="Description">
            <Text>This is some sample description text</Text>
            <Button variant="link" size="sm" color="primary">
              More...
            </Button>
          </Section>

          <Section name="Amenities">
            <Stack spacing={2}>
              <p>Air Conditioning</p>
              <p>Dryer</p>
              <p>Kitchen</p>
              <p>Wifi</p>
            </Stack>
          </Section>
        </Info>

        <Box minWidth="300px">
          <Box p={5} shadow="md" borderRadius="10px">
            <Select placeholder="" focusBorderColor="primary" />
            <Button w="100%" colorScheme="gray">
              Book Now
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default RoomDetails;

const ImageGrid = styled(Grid)`
  grid-template-areas:
    "first"
    "first";
`;

const Info = styled(Box)`
  & > * {
    padding-bottom: 0.75rem;
  }
`;
