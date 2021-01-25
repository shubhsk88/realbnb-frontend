import { ReactElement } from "react";
import NextImage from "next/image";
import { Skeleton, SkeletonProps } from "@chakra-ui/react";

import { Photo } from "../../generated";

interface ImageProps extends SkeletonProps {
  photo: Photo;
  children?: JSX.Element | JSX.Element[];
}

export const Image = ({
  photo,
  children,
  ...props
}: ImageProps): ReactElement => (
  <Skeleton
    w="100%"
    h="100%"
    pos="relative"
    borderRadius="inherit"
    overflow="hidden"
    isLoaded={!!photo}
    {...props}
  >
    {photo ? (
      <>
        <NextImage src={photo.link} layout="fill" objectFit="cover" />
        {children}
      </>
    ) : null}
  </Skeleton>
);
