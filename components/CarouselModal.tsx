import { ReactElement } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Carousel } from "./common/Carousel";

export const CarouselModal = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="60vw" h="70vh">
          <ModalBody>
            <ModalCloseButton />
            <Carousel />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
