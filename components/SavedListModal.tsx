import { ReactElement, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import {
  Box,
  ButtonProps,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";

import { isLoggedInVar } from "@/lib/cache";
import { IconButtonOpaque, Image } from "@/components/common";
import { useGetUserListsQuery, useUpdateListMutation } from "@/generated";
import { AuthModal } from "./Auth/AuthModal";

interface SavedListProps extends ButtonProps {
  roomId: string;
  liked: boolean;
}

export const SavedListModal = ({
  roomId,
  liked,
  ...props
}: SavedListProps): ReactElement => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButtonOpaque
        aria-label="Save room"
        icon={
          <Icon
            as={AiOutlineHeart}
            boxSize={5}
            color={liked ? "red.400" : "white"}
          />
        }
        {...props}
        onClick={onOpen}
      />

      {isLoggedIn ? (
        <MyModal
          isOpen={isOpen}
          onClose={onClose}
          roomId={roomId}
          liked={liked}
        />
      ) : (
        <AuthModal isLoginOpen={isOpen} onLoginClose={onClose} />
      )}
    </>
  );
};

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  liked: boolean;
}

const MyModal = ({ isOpen, onClose, roomId, liked }: MyModalProps) => {
  const { data, loading, error } = useGetUserListsQuery();

  const [onUpdateList] = useUpdateListMutation();

  if (loading) return <div>loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!data.getList.ok) return <div>{data.getList.error}</div>;

  const lists = data.getList.lists;

  const addToList = (id: string) => {
    onUpdateList({ variables: { id, roomId } });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Save to list</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={0}>
          <VStack as="ul" align="stretch">
            <Box p={2}>
              <HStack as="li" spacing={10}>
                <IconButton
                  w={20}
                  h={20}
                  icon={<Icon as={HiPlus} boxSize={10} color="white" />}
                  aria-label="add new list"
                  bgColor="gray.700"
                  borderRadius="md"
                />

                <Heading as="h4" fontSize="md" fontWeight="medium">
                  Create new list
                </Heading>
              </HStack>
            </Box>

            {lists.map((list) => (
              <Box
                key={list.id}
                p={2}
                cursor="pointer"
                aria-role="button"
                _hover={{ backgroundColor: "gray.100" }}
                onClick={() => addToList(list.id)}
              >
                <HStack as="li" spacing={10}>
                  <Image
                    w={20}
                    h={20}
                    photo={list.rooms[0]?.photos[0]}
                    borderRadius="md"
                  />
                  <div>
                    <Heading as="h4" fontSize="md" fontWeight="medium">
                      {list.name}
                    </Heading>
                    <Text>
                      {list.rooms.length
                        ? list.rooms.length
                        : "Nothing Saved Yet"}
                    </Text>
                  </div>
                </HStack>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
