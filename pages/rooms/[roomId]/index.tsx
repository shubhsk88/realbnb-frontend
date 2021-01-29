import { ReactElement, useMemo, useState } from "react";
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
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";

import { Photo, useGetRoomQuery } from "@/generated";
import { BookingCard, CarouselModal } from "@/components";
import {
  ButtonOpaque,
  ButtonPrimary,
  IconButtonOpaque,
  IconPair,
  Image,
  TextSummary,
  ReviewCard,
  ReviewScore,
} from "@/components/common";

const RoomDetails = (): ReactElement => {
  const router = useRouter();
  const { query } = router;
  const id = query.roomId as string;
  const { loading, data, error } = useGetRoomQuery({ variables: { id } });
  const [showAmenities, setShowAmenities] = useState(false);
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

  // FIXME: averageRating should be plural
  const avgRoomScores = Object.entries(room.averageRating).slice(1);
  const totalAmenity = room.amenities.length;
  return (
    <>
      <ImageGrid
        h="50vh"
        mb={20}
        photos={room.photos}
        overallRating={overallRating}
      />

      <Stack direction="row" spacing={7} mb={7}>
        <VStack flex={1} align="stretch" maxW="100%" spacing={4}>
          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between">
              <Text textStyle="label" fontSize="lg">
                {room.roomType.name}
              </Text>

              <Stat flex={0}>
                <StatNumber
                  color="primary"
                  display={{ base: "unset", xl: "none" }}
                >
                  ${room.price}
                </StatNumber>
              </Stat>
            </HStack>

            <Heading as="h2" size="lg">
              {room.name}
            </Heading>
            <IconPair icon={IoBedOutline}>{room.beds}</IconPair>
          </VStack>

          <Section name="Description">
            <TextSummary>{room.description}</TextSummary>
          </Section>

          <Section name="Amenities">
            <SimpleGrid columns={2} spacing={4}>
              {room.amenities
                .slice(0, showAmenities ? totalAmenity : 5)
                .map(({ id, name }) => (
                  <div key={id}>
                    <Text casing="capitalize">{name}</Text>
                  </div>
                ))}
            </SimpleGrid>

            {totalAmenity > 5 ? (
              <Button
                mt={10}
                mx="10rem"
                rightIcon={<Icon as={BsList} />}
                onClick={() => setShowAmenities((prev) => !prev)}
              >
                {!showAmenities ? `Show ${totalAmenity} More` : `Show Less`}
              </Button>
            ) : null}
          </Section>
        </VStack>

        <BookingCard
          w="400px"
          display={{ base: "none", xl: "unset" }}
          room={room}
        />
      </Stack>

      <Section name="Reviews">
        <HStack fontSize="20px">
          <Icon as={AiOutlineStar} />
          <Text fontWeight="bold">
            {overallRating} ({room.reviews.length})
          </Text>
        </HStack>

        <SimpleGrid columns={2} spacingX={20} spacingY={6} my={12}>
          {avgRoomScores.map(([name, score]) => (
            <ReviewScore key={name} name={name} rating={Number(score)} />
          ))}
        </SimpleGrid>

        <SimpleGrid columns={2} spacingX={20} spacingY={12}>
          {room.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </SimpleGrid>
      </Section>

      <ButtonPrimary
        pos="absolute"
        left="50%"
        transform="translateX(-50%)"
        bottom={0}
        w="min(90%, 500px)"
        display={{ base: "unset", xl: "none" }}
      >
        Book
      </ButtonPrimary>
    </>
  );
};

export default RoomDetails;

interface SectionProps {
  name: string;
  children: JSX.Element | JSX.Element[];
}

const Section = ({ name, children }: SectionProps) => (
  <Box>
    <hr />
    <Heading as="h2" fontWeight="bold" size="md" my={4}>
      {name}
    </Heading>
    {children}
  </Box>
);

interface ImageGridProps extends GridProps {
  photos: Photo[];
  overallRating: number;
}

const ImageGrid = ({ photos, overallRating, ...props }: ImageGridProps) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const onClose = () => {
    setIsCarouselOpen(false);
  };
  return (
    <>
      <CarouselModal isOpen={isCarouselOpen} onClose={onClose} />

      <Grid
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={2}
        pos="relative"
        borderRadius="xl"
        overflow="hidden"
        {...props}
      >
        <GridImage colSpan={4} rowSpan={3} photo={photos[0]}>
          <HStack pos="absolute" spacing={2} top={3} left={4}>
            <IconButtonOpaque
              aria-label="Share listing"
              icon={<Icon as={FiShare} boxSize={5} />}
            />
            <IconButtonOpaque
              aria-label="Save listing"
              icon={<Icon as={AiOutlineHeart} boxSize={5} />}
            />
          </HStack>

          <ButtonOpaque
            pos="absolute"
            bottom={3}
            left={4}
            rightIcon={<Icon as={AiOutlineStar} boxSize={5} />}
          >
            {overallRating}
          </ButtonOpaque>
        </GridImage>

        <GridImage colSpan={2} rowSpan={1} photo={photos[1]} />

        {photos
          .slice(2, 6)
          .concat(Array(6 - photos.length || 0).fill(null))
          .map((photo, idx) => (
            <GridImage key={photo?.id ?? idx} photo={photo} />
          ))}

        <ButtonOpaque
          pos="absolute"
          bottom={3}
          right={4}
          leftIcon={<Icon as={HiOutlinePhotograph} boxSize={5} />}
          onClick={() => setIsCarouselOpen((prev) => !prev)}
        >
          {photos.length}
        </ButtonOpaque>
      </Grid>
    </>
  );
};

interface GridImageProps extends GridItemProps {
  photo: Photo;
  children?: JSX.Element | JSX.Element[];
}

const GridImage = ({ photo, children, ...props }: GridImageProps) => {
  return (
    <GridItem overflow="hidden" {...props}>
      <Image photo={photo}>{children}</Image>
    </GridItem>
  );
};
