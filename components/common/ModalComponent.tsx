import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import { ButtonPrimary } from "./Buttons/Primary";
import { Login } from "../Login";
import { SignUp } from "../SignUp";

export const ModalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [switchLogin, setSwitchLogin] = useState(true);

  return (
    <>
      <ButtonPrimary onClick={onOpen}>Login</ButtonPrimary>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{switchLogin ? "Login" : "Sign Up"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {switchLogin ? <Login /> : <SignUp />}
            <Center spacing={2} mt={4}>
              <Button
                variant="link"
                onClick={() => setSwitchLogin((prev) => !prev)}
              >
                {switchLogin ? "Create Account" : "Login to existing account"}
              </Button>
            </Center>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
