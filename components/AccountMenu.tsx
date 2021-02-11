import { ReactElement, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  Skeleton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import { useAuth } from "@/lib/auth";
import { useGetUserQuery } from "@/generated";
import { isLoggedInVar } from "@/lib/cache";

export const AccountMenu = (): ReactElement => {
  const { getUser, logout } = useAuth();

  const { data, error, loading, refetch } = useGetUserQuery({
    fetchPolicy: "cache-and-network",
  });

  // FIXME: get JWT token to refresh correctly, likely requires apollo-link-context

  // useEffect(() => {
  //   const { user, loading, error } = getUser();
  // }, [isLoggedInVar]);

  /* useEffect(() => {
    refetch();
  }, [isLoggedInVar]); */

  /* console.log("loading", loading);
  console.log("user", { ...data });
  console.log("error", error); */

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }

  const user = data?.profile?.user;

  return (
    <Box>
      <Skeleton isLoaded={loading || !!user}>
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            leftIcon={<Avatar size="sm" name={user.name} src={user.avatar} />}
            rightIcon={<Icon as={FiChevronDown} />}
          >
            {user.name}
          </MenuButton>
          <MenuList>
            <MenuItem>Account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Skeleton>
    </Box>
  );
};
