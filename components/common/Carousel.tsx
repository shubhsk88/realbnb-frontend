import { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";

import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from "next/image";

const slides = [
  "http://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/nxayaq3ppnairemae4ev.webp",
  "http://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/sue8ad6nbae5tad9pgxr.webp",
  "http://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/e3q92gdwwpl1svuzghcl.webp",
  "http://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/bv7y9ypobpnbrgukvjly.webp",
  "http://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/olwihstshpaqyqqp7mjx.webp",
  "http://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/menfpnovpbxdl0ufygyd.webp",
  "http://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/zbr9m61suuhkvo74tsxt.webp",
];

export const mediaByIndex = (index) => slides[index % slides.length];

export const Carousel = () => {
  const [viewportRef, embla] = useEmblaCarousel();
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <Box pos="relative" w="100%" h="100%">
      <Box ref={viewportRef} overflow="hidden" w="100%" h="100%">
        <Flex w="100%" h="100%">
          {slides.map((slide) => (
            <Box
              key={slide}
              minW="100%"
              maxW="100%"
              minH="100%"
              maxH="100%"
              position="relative"
            >
              <Image
                src={slide}
                alt="A cool cat."
                layout="fill"
                objectFit="contain"
              />
            </Box>
          ))}
        </Flex>
      </Box>

      <IconButton
        onClick={scrollPrev}
        pos="absolute"
        top="50%"
        left={5}
        transform="translateY(-50%)"
        variant="ghost"
        aria-label="Next slide"
        icon={<FaChevronLeft />}
      />

      <IconButton
        onClick={scrollNext}
        pos="absolute"
        top="50%"
        right={5}
        transform="translateY(-50%)"
        variant="ghost"
        aria-label="Next slide"
        icon={<FaChevronRight />}
      />
    </Box>
  );
};
