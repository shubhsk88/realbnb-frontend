import styled from "@emotion/styled";

import { useRouter } from "next/router";
import { IoBedOutline } from "react-icons/io5";
import {
  Box,
  Flex,
  Stack,
  HStack,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { ElementType, ReactElement, ReactNode, useMemo } from "react";
import { FiShare } from "react-icons/fi";
import { RatingButton } from "../../components/shared";
import { useGetRoomQuery } from "../../generated";
import { BookingCard } from "../../components/BookingCard";
import { Review } from "../../components/Review";
import { TextSummary } from "../../components/shared/TextSummary";
import { BsList } from "react-icons/bs";

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
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (loading) return <div>Loading</div>;

  const room = data.getRoom.room;

  const overallRating = useMemo(() => {
    const sum = room.reviews.reduce(
      (acc, { averageRating }) => (acc += averageRating),
      0
    );
    return sum ? sum / room.reviews.length : sum;
  }, [room.reviews]);
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
      <Stack direction="row" spacing="30px">
        <Info flexGrow={1}>
          <Text size="sm" fontWeight="medium" color="gray.400">
            Room Type
          </Text>
          <Heading as="h2" size="lg">
            Room Name
          </Heading>
          <IconPair icon={IoBedOutline}>2</IconPair>
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
        <Review
          ratings={room.averageRating}
          reviews={room.reviews}
          overallRating={overallRating}
        />
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
