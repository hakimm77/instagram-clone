import React from "react";
import { Text, Image, Flex, Button } from "@chakra-ui/react";
import signup from "../../helpers/signup";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" mt={50}>
      <Image
        src={require("../../assets/instagram-icon.jpg")}
        width="300px"
        height="200px"
        mb={50}
      />

      <Button onClick={signup} backgroundColor="#0095f6" color="#fafafa" mb={5}>
        Sign up
      </Button>

      <Link to="/login">
        <Text cursor="pointer" fontWeight="bold">
          Already have an account, login here
        </Text>
      </Link>
    </Flex>
  );
};

export default Signup;
