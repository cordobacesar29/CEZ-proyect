import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Flex>
      <Flex w={'100%'} minHeight={"100vh"}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Flex>
    </Flex>
  );
};
