import styled from "@emotion/styled";
import { useRouter } from "next/router";
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
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { ElementType, ReactElement, ReactNode } from "react";
import { FiShare } from "react-icons/fi";
import { RatingButton } from "../../components/shared";
import { useGetRoomQuery } from "../../generated";
import { ReviewCard } from "../../components/shared/ReviewCard";
import { Review } from "../../components/Review";

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
        gap={2}
        borderRadius="xl"
        overflow="hidden"
        h="50vh"
        mb={20}
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(3, 1fr)"
      >
        <GridItem overflow="hidden" colSpan={4} rowSpan={3} position="relative">
          <Image layout="fill" src={room.photos[0].link} />
          <RatingButton
            position="absolute"
            left={6}
            bottom={6}
            rightIcon={<AiOutlineStar />}
          >
            4.8
          </RatingButton>
          <HStack position="absolute" spacing={2} top={2} left={4}>
            <RatingButton>
              <FiShare size="1.3rem" />
            </RatingButton>
            <RatingButton>
              <AiOutlineHeart size="1.3rem" />
            </RatingButton>
          </HStack>
        </GridItem>
        <GridItem overflow="hidden" colSpan={2} rowSpan={1} position="relative">
          <Image layout="fill" src={room.photos[1].link} />
        </GridItem>

        {room.photos.slice(2, 6).map((photo) => (
          <GridItem overflow="hidden" key={photo.id} position="relative">
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
      <Review />
    </>
  );
};

export default RoomDetails;

const Info = styled(Box)`
  & > * {
    padding-bottom: 0.75rem;
  }
`;
