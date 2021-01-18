import { useState, useEffect, useCallback } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { useEmblaCarousel } from "embla-carousel/react";
import Image from "next/image";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
  const [emblaRef, embla] = useEmblaCarousel();
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

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
    <Box overflow="hidden" pos="relative">
      <Box display="flex" ref={emblaRef}>
        {slides.map((slide, index) => (
          <Box key={index} pos="relative" minW="100%">
            <img src={mediaByIndex(index)} alt="A cool cat." />
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={() => scrollPrev}
        pos="absolute"
        top="50%"
        left={5}
        transform="translateY(-50%)"
        aria-label="Next slide"
        icon={<FaChevronLeft />}
      />
      <IconButton
        onClick={() => scrollNext}
        pos="absolute"
        top="50%"
        right={5}
        transform="translateY(-50%)"
        aria-label="Next slide"
        icon={<FaChevronRight />}
      />
    </Box>
  );
};
