import { ReactElement, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import {
  ButtonProps,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";

import { isLoggedInVar } from "@/lib/cache";
import { ButtonPrimary, IconButtonOpaque } from "@/components/common";
import {
  List,
  useCreateListMutation,
  useGetUserListsQuery,
  useUpdateListMutation,
} from "@/generated";
import BeatLoader from "react-spinners/BeatLoader";
import { AuthModal } from "./Auth/AuthModal";
import { IoChevronBackSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ItemEntry } from "./common";

interface SavedListProps extends ButtonProps {
  roomId: string;
  liked: boolean;
}

export const SavedListModal = ({
  roomId,
  liked,
  ...props
}: SavedListProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [onUpdateList] = useUpdateListMutation({
    refetchQueries: () => ["getRooms, getRoom"],
  });

  const onClose = () => {
    setIsOpen(false);
  };

  const handleLike = () => {
    liked ? onUpdateList({ variables: { roomId } }) : setIsOpen(true);
  };

  return (
    <>
      <IconButtonOpaque
        aria-label="Save room"
        icon={
          <Icon
            as={liked ? AiFillHeart : AiOutlineHeart}
            color={liked ? "red.400" : "white"}
            boxSize={5}
          />
        }
        {...props}
        onClick={handleLike}
      />

      {isLoggedIn ? (
        <MyModal roomId={roomId} isOpen={isOpen} onClose={onClose} />
      ) : (
        <AuthModal isLoginOpen={isOpen} onLoginClose={onClose} />
      )}
    </>
  );
};

interface MyModalProps {
  roomId: string;
  isOpen: boolean;
  onClose: () => void;
}

const MyModal = ({ roomId, isOpen, onClose }: MyModalProps): ReactElement => {
  const { data, loading, error } = useGetUserListsQuery();
  const [isCreateList, setIsCreateList] = useState(false);

  const toggleContent = () => {
    setIsCreateList((prev) => !prev);
  };

  const onCloseReset = () => {
    isCreateList ? toggleContent() : onClose();
  };

  if (loading) return <div>loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!data.getList.ok) return <div>{data.getList.error}</div>;
  return (
    <Modal isOpen={isOpen} onClose={onCloseReset}>
      <ModalOverlay />

      {!isCreateList ? (
        <ModalContentLists
          roomId={roomId}
          lists={data.getList.lists}
          toggleContent={toggleContent}
          onClose={onClose}
        />
      ) : (
        <ModalContentForm
          roomId={roomId}
          toggleContent={toggleContent}
          onClose={onCloseReset}
        />
      )}
    </Modal>
  );
};

interface ContentListsProps extends ModalContentProps {
  roomId: string;
  lists: List[];
  toggleContent: () => void;
  onClose: () => void;
}

const ModalContentLists = ({
  roomId,
  lists,
  toggleContent,
  onClose,
  ...props
}: ContentListsProps) => {
  const [onUpdateList] = useUpdateListMutation({
    refetchQueries: () => ["getRooms, getRoom"],
    onCompleted: () => {
      onClose();
    },
  });

  const addToList = (id: string) => {
    onUpdateList({ variables: { id, roomId } });
  };

  return (
    <ModalContent {...props}>
      <ModalHeader textAlign="center">Save to list</ModalHeader>
      <ModalCloseButton />
      <ModalBody px={0}>
        <VStack as="ul" align="stretch">
          {/* FIXME: dark gray color scheme of some sort */}
          <ItemEntry
            as="li"
            image={
              <IconButton
                icon={<Icon as={HiPlus} boxSize={10} color="white" />}
                onClick={toggleContent}
                aria-label="Add new list"
                bgColor="gray.700"
                boxSize="full"
              />
            }
          >
            <Heading as="h5" textStyle="labelDark">
              Create new list
            </Heading>
          </ItemEntry>

          {lists.map((list) => (
            <ItemEntry
              key={list.id}
              as="li"
              photo={list.rooms[0]?.photos[0]}
              onClick={() => addToList(list.id)}
            >
              <Heading as="h5" textStyle="labelDark">
                {list.name}
              </Heading>
              <Text textStyle="labelMedium">
                {list.rooms.length ? list.rooms.length : "Nothing Saved Yet"}
              </Text>
            </ItemEntry>
          ))}
        </VStack>
      </ModalBody>
    </ModalContent>
  );
};

interface ContentFormProps extends ModalContentProps {
  roomId: string;
  toggleContent: () => void;
  onClose: () => void;
}

const ModalContentForm = ({
  roomId,
  toggleContent,
  onClose,
  ...props
}: ContentFormProps) => {
  const { handleSubmit, register } = useForm();
  const toast = useToast();

  const [formError, setFormError] = useState("");

  const [onCreateList, { loading: formLoading }] = useCreateListMutation({
    onCompleted: ({ createList }) => {
      if (createList.ok) {
        toast({
          title: "Added to favorites successfully",
          status: "success",
          duration: 2000,
        });
        onClose();
      } else {
        setFormError("An Unknown error occurred, please try again");
      }
    },
    refetchQueries: () => ["getRooms, getRoom"],
  });

  const onSubmit = (data: { name: string }) => {
    onCreateList({
      variables: {
        name: data.name,
        roomId,
      },
    });
  };

  //TODO: should have maxHeight and virtual scrolling
  //TODO: ModalContent on outside for smoother transition?

  return (
    <ModalContent {...props}>
      <ModalHeader textAlign="center">
        <Text>Name list</Text>
      </ModalHeader>
      <IconButton
        aria-label="Go back to lists"
        variant="ghost"
        icon={<Icon as={IoChevronBackSharp} boxSize={5} />}
        onClick={toggleContent}
        pos="absolute"
        top={2}
        left={3}
        boxSize="32px"
        minWidth="unset"
      >
        Back
      </IconButton>
      <ModalCloseButton />

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
    </ModalContent>
  );
};
