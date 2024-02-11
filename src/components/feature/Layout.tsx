import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useSessionProvider";
import { ROUTES } from "../../constants/ROUTES";

export const Layout = () => {
  const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		window.location.href = `${ROUTES.LOGIN}`
	}
  
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
