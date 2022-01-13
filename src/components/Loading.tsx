import { Flex, Image } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Image src={require("../assets/loading.gif")} />
    </Flex>
  );
};

export default Loading;
