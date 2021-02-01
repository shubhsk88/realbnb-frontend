import { ListCard } from "@/components";
import { ButtonPrimary } from "@/components/common";
import { List, useCreateListMutation, useGetUserListsQuery } from "@/generated";
import BeatLoader from "react-spinners/BeatLoader";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SavedLists = () => {
  const { data, loading, error } = useGetUserListsQuery();
  const { handleSubmit, register } = useForm();
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [
    onCreateList,
    { loading: createListLoading, error: createlistError },
  ] = useCreateListMutation({
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
        toast({
          title: "Unknown error occured please try again ",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    refetchQueries: () => ["getUserLists"],
  });

  const onSubmit = ({ name }: { name: string }) => {
    onCreateList({
      variables: {
        name,
      },
    });
  };
  const lists = data?.getList.lists;
  if (error || data?.getList?.error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        my={10}
        alignItems="center"
      >
        <Heading as="h3" fontWeight="semibold" fontSize="2rem">
          Saved
        </Heading>
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <Button
              background="white"
              color="gray.800"
              border="1px solid"
              borderColor="gray.800"
              py={6}
              px={8}
              _hover={{ background: "gray.100" }}
            >
              Create List
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign="center" fontWeight="semibold">
              Create List
            </PopoverHeader>
            <PopoverBody>
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
                  isLoading={createListLoading}
                  spinner={<BeatLoader size={8} color="white" />}
                  type="submit"
                  w="full"
                >
                  Create
                </ButtonPrimary>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      {lists ? (
        <Wrap spacing="30px">
          {lists.map((list: List) => (
            <WrapItem key={list.id}>
              <Link href={`/saved/${list.id}`}>
                <a>
                  <ListCard list={list} />
                </a>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Box>Please Create List</Box>
      )}
    </>
  );
};

export default SavedLists;
