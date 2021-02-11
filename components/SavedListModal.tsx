import { ReactElement, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import {
  Box,
  ButtonProps,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";

import { isLoggedInVar } from "@/lib/cache";
import { ButtonPrimary, IconButtonOpaque, Image } from "@/components/common";
import {
  useCreateListMutation,
  useGetUserListsQuery,
  useUpdateListMutation,
  Photo,
} from "@/generated";
import BeatLoader from "react-spinners/BeatLoader";
import { AuthModal } from "./Auth/AuthModal";
import { IoChevronBackSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";

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
            as={liked ? AiFillHeart : AiOutlineHeart}
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
  const { data, loading, error } = useGetUserListsQuery({
    fetchPolicy: "cache-and-network",
  });
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
  const toast = useToast();
  const [formError, setFormError] = useState<string>("");
  const [onUpdateList] = useUpdateListMutation();
  const { handleSubmit, register } = useForm();
  const [onCreateList, { loading: formLoading }] = useCreateListMutation({
    onCompleted: ({ createList }) => {
      if (createList.ok) {
        toast({
          title: "Added to favourite successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      } else {
        setFormError("An Unknown error occured.Please try again");
      }
    },
    refetchQueries: () => ["getRooms", "getList"],
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!data.getList.ok) return <div>{data.getList.error}</div>;

  const lists = data.getList.lists;

  const addToList = (id: string) => {
    onUpdateList({ variables: { id, roomId } });
    onClose();
  };
  const onSubmit = (data: { name: string }) => {
    onCreateList({
      variables: {
        name: data.name,
        roomId,
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          {isNewOpen ? (
            <Box display="flex">
              <IconButton
                mr={12}
                aria-label="Back"
                bgColor="transparent"
                onClick={() => setIsNewOpen(false)}
                icon={<Icon as={IoChevronBackSharp} boxSize="5" />}
              />
              <Text justifySelf="center">Name the new list</Text>
            </Box>
          ) : (
            "Save to list"
          )}
        </ModalHeader>

        <ModalCloseButton />
        <Divider />
        {!isNewOpen ? (
          <ModalBody px={0} my={2}>
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
                    onClick={() => setIsNewOpen(true)}
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
                      photo={list.rooms[0]?.photos[0] as Photo}
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
        ) : (
          <ModalBody>
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={10}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={register}
                  name="name"
                  type="text"
                  placeholder="Name"
                  focusBorderColor="primary"
                />
              </FormControl>
              <ButtonPrimary
                isLoading={formLoading}
                spinner={<BeatLoader size={8} color="white" />}
                type="submit"
                w="full"
              >
                Create
              </ButtonPrimary>
            </VStack>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
