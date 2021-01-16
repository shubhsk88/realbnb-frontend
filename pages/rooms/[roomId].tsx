import { ReactElement, ReactNode, useMemo } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import {
  Box,
  Stack,
  HStack,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";

import Image from "next/image";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";

import { useGetRoomQuery } from "../../generated";
import { BookingCard, Review } from "../../components";
import {
  ButtonOpaque,
  IconButtonOpaque,
  IconPair,
  TextSummary,
} from "../../components/common";
interface SectionProps {
  name: string;
  children: ReactNode;
}

const Section = ({ name, children }: SectionProps) => (
  <Box mt={20}>
    <hr />
    <Heading as="h2" fontWeight="bold" my={4} size="md">
      {name}
    </Heading>
    {children}
  </Box>
);

const RoomDetails = (): ReactElement => {
  const router = useRouter();
  const { query } = router;
  const id = query.roomId as string;
  const { loading, data, error } = useGetRoomQuery({ variables: { id } });

  const room = data?.getRoom.room;

  const averageReviews = () => {
    const sum = room
      ? room.reviews.reduce(
          (sum, { averageRating }) => (sum += averageRating),
          0
        )
      : null;

    return sum ? sum / room.reviews.length : sum;
  };

  const overallRating = useMemo(() => averageReviews(), [
    data?.getRoom.room.reviews,
  ]);

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (loading) return <div>Loading</div>;

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
          <ButtonOpaque
            position="absolute"
            left={6}
            bottom={6}
            rightIcon={<AiOutlineStar />}
          >
            {overallRating}
          </ButtonOpaque>
          <HStack position="absolute" spacing={2} top={2} left={4}>
            <IconButtonOpaque
              aria-label="Share listing"
              icon={<FiShare size="1.3rem" />}
            />
            <IconButtonOpaque
              aria-label="Save listing"
              icon={<AiOutlineHeart size="1.3rem" />}
            />
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
      <Stack direction="row" spacing="30px">
        <Info flexGrow={1}>
          <Text size="sm" fontWeight="medium" color="gray.400">
            Room Type
          </Text>
          <Heading as="h2" size="lg">
            Room Name
          </Heading>
          <IconPair icon={IoBedOutline}>{room.beds}</IconPair>
          <Section name="Description">
            <TextSummary>{room.description}</TextSummary>
          </Section>

          <Section name="Amenities">
            <SimpleGrid columns={2} spacingX={12} spacingY={4}>
              {room.amenities.slice(0, 5).map(({ id, name }) => (
                <Box key={id}>
                  <Text casing="capitalize">{name}</Text>
                </Box>
              ))}
            </SimpleGrid>

            <Button my={10} rightIcon={<BsList />} mx="15rem">
              Show More
            </Button>
          </Section>
        </Info>

        <BookingCard />
      </Stack>
      <Section name="Review">
        <Review ratings={room.averageRating} reviews={room.reviews} />
      </Section>
    </>
  );
};

export default RoomDetails;

const Info = styled(Box)`
  & > * {
    padding-bottom: 0.75rem;
  }
`;
