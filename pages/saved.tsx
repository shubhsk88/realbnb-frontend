import { ListCard } from "@/components";
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
} from "@chakra-ui/react";

const SavedLists = () => {
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
      <Box>
        <ListCard />
      </Box>
    </>
  );
};

export default SavedLists;
