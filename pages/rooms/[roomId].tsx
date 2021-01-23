import { ReactElement, useMemo } from "react";
import { useRouter } from "next/router";
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
  Icon,
  GridProps,
  GridItemProps,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";

import { Photo, useGetRoomQuery } from "../../generated";
import { BookingCard, Review } from "../../components";
import {
  ButtonOpaque,
  IconButtonOpaque,
  IconPair,
  Image,
  TextSummary,
} from "../../components/common";
import { CarouselModal } from "../../components/CarouselModal";

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
      <ImageGrid
        h="50vh"
        mb={20}
        photos={room.photos}
        overallRating={overallRating}
      />

      <Stack direction="row" spacing="30px">
        <VStack flexGrow={1} align="stretch" spacing={3}>
          <CarouselModal />

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

            <Button my={10} rightIcon={<Icon as={BsList} />} mx="15rem">
              Show More
            </Button>
          </Section>
        </VStack>

        <BookingCard />
      </Stack>
      <Section name="Review">
        <Review ratings={room.averageRating} reviews={room.reviews} />
      </Section>
    </>
  );
};

export default RoomDetails;

interface ImageGridProps extends GridProps {
  photos: Photo[];
  overallRating: number;
}

const ImageGrid = ({ photos, overallRating, ...props }: ImageGridProps) => (
  <Grid
    templateColumns="repeat(6, 1fr)"
    templateRows="repeat(3, 1fr)"
    gap={2}
    borderRadius="xl"
    overflow="hidden"
    {...props}
  >
    <GridImage colSpan={4} rowSpan={3} photo={photos[0]}>
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
          icon={<Icon as={FiShare} boxSize={5} />}
        />
        <IconButtonOpaque
          aria-label="Save listing"
          icon={<Icon as={AiOutlineHeart} boxSize={5} />}
        />
      </HStack>
    </GridImage>

    <GridImage colSpan={2} rowSpan={1} photo={photos[1]} />

    {photos
      .slice(2, 6)
      .concat(Array(6 - photos.length || 0).fill(null))
      .map((photo, idx) => (
        <GridImage key={photo?.id ?? idx} photo={photo} />
      ))}
  </Grid>
);

interface GridImageProps extends GridItemProps {
  photo: Photo;
  children?: JSX.Element | JSX.Element[];
}

const GridImage = ({ photo, children, ...props }: GridImageProps) => {
  return (
    <GridItem overflow="hidden" position="relative" {...props}>
      <Image photo={photo} />
      {children}
    </GridItem>
  );
};

interface SectionProps {
  name: string;
  children: JSX.Element | JSX.Element[];
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
