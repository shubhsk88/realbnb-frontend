/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement, useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import { ButtonPrimary } from "../common/Buttons/Primary";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

// FIXME: onLoginClose should be required if isLoginOpen is used
interface AuthModalProps {
  isLoginOpen?: boolean | null;
  onLoginClose?: () => void;
}

export const AuthModal = ({
  isLoginOpen = null,
  onLoginClose = () => {},
}: AuthModalProps): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: isLoginOpen,
  });

  const [switchLogin, setSwitchLogin] = useState(true);
  // const [isAllOpen, setIsAllOpen] = useState(isLoginOpen);

  useEffect(() => {
    if (isLoginOpen) onOpen();
    else if (!isOpen) onCloseAll();
  }, [isLoginOpen, isOpen]);

  const onCloseAll = () => {
    onLoginClose();
    onClose();
  };

  return (
    <>
      {isLoginOpen === null ? (
        <ButtonPrimary onClick={onOpen}>Login</ButtonPrimary>
      ) : null}

      <Modal isOpen={isOpen} onClose={onCloseAll}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{switchLogin ? "Login" : "Sign Up"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {switchLogin ? <Login closeModal={onCloseAll} /> : <SignUp />}
          </ModalBody>

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
