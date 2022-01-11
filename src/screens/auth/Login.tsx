import React from "react";
import { Text, Image, Flex, Button } from "@chakra-ui/react";
import login from "../../helpers/login";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" mt={50}>
      <Image
        src={require("../../assets/instagram-icon.jpg")}
        width="300px"
        height="200px"
        mb={50}
      />

      <Button onClick={login} backgroundColor="#0095f6" color="#fafafa" mb={5}>
        Sign in
      </Button>

      <Link to="/signup">
        <Text cursor="pointer" fontWeight="bold">
          Don't have an account, sign up here
        </Text>
      </Link>
    </Flex>
  );
};

export default Login;
