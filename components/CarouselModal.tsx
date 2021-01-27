import { ReactElement } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { Carousel } from "./common/Carousel";

interface CarouselModalProps {
  isOpen: boolean;
}

export const CarouselModal = ({ isOpen }: CarouselModalProps): ReactElement => {
  const { onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="60vw" h="70vh">
        <ModalBody>
          <ModalCloseButton />
          <Carousel />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
