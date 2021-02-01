import { ListCard } from "@/components";
import { List, useGetUserListsQuery } from "@/generated";

import {
  Box,
  Button,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";

const SavedLists = () => {
  const { data, loading, error } = useGetUserListsQuery();

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
        <Popover>
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
              Are you sure you want to have that milkshake?
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
