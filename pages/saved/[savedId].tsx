import React from "react";
import { useRouter } from "next/router";
import { ListDetailsCard } from "@/components/ListDetailsCard";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import { Heading, IconButton } from "@chakra-ui/react";

const SavedListRoom = () => {
  const router = useRouter();
  const { savedId } = router.query;

  return (
    <div>
      <IconButton
        _hover={{ background: "gray.100" }}
        aria-label="Back Button"
        padding={4}
        borderRadius="full"
        mb={8}
        mt={4}
        background="white"
        icon={<IoChevronBackOutline size="40px" />}
        onClick={() => router.push("/saved")}
      />
      <Heading fontSize="3xl" my={4} mx={4}>
        List Name
      </Heading>
      <ListDetailsCard />
    </div>
  );
};

export default SavedListRoom;
