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
  onClose: () => void;
}

export const CarouselModal = ({
  isOpen,
  onClose,
}: CarouselModalProps): ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="80vw" h="80vh">
        <ModalBody>
          <ModalCloseButton />
          <Carousel />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
