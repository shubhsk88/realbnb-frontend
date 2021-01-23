import React, { ReactElement, useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import { ButtonPrimary } from "../common/Buttons/Primary";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const AuthModal = (): ReactElement => {
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
          <ModalBody>{switchLogin ? <Login /> : <SignUp />}</ModalBody>

          <ModalFooter>
            <Button
              variant="link"
              mx="auto"
              onClick={() => setSwitchLogin((prev) => !prev)}
            >
              {switchLogin ? "Create Account" : "Login to existing account"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
