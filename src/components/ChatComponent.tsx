import React, { useEffect, useState } from "react";
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import sendMessage from "../helpers/sendMessage";
import getUserInfo from "../helpers/getUserInfo";
import Loading from "./Loading";

interface messageType {
  message: string;
  picture: string;
  userId: string;
}

interface UserType {
  email: string;
  id: string;
  name: string;
  profilePic: string;
}

const ChatComponent: React.FC<{ messages: Array<messageType> }> = ({
  messages,
}) => {
  const [userId, setUserId] = useState(localStorage.getItem("USER"));
  const [user, setUser] = useState<UserType>();
  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    getUserInfo(userId, setUser);
  }, []);

  const handleSendMessage = async () => {
    if (messageText && userId) {
      await sendMessage(messageText, userId, user?.profilePic);
      setMessageText("");
    }
  };

  const MessageContainer: React.FC<{ msg: messageType }> = ({ msg }) => {
    return (
      <Flex
        padding={2}
        margin="5px 5px 5px 7px"
        backgroundColor="#fafafa"
        borderRadius="15px"
        border="1px solid #dadada"
        maxW="40%"
        w="fit-content"
        wordBreak="break-word"
      >
        <Text>{msg.message}</Text>
      </Flex>
    );
  };

  return (
    <Flex flexDir="column" w="60%" h="80vh" border="1px solid #dadada" mt={5}>
      <Flex
        alignItems="center"
        borderBottom="1px solid #dadada"
        h="50px"
        w="100%"
        paddingLeft={5}
      >
        <Text fontSize={21} fontWeight="bold">
          General chat
        </Text>
      </Flex>

      {messages.length ? (
        <Flex
          flexDir="column-reverse"
          w="100%"
          h="80%"
          padding={2}
          overflowX="auto"
        >
          {messages.map((msg) => (
            <Flex
              flexDir="row"
              alignItems="center"
              w="100%"
              justifyContent={userId === msg.userId ? "flex-end" : "flex-start"}
            >
              {userId !== msg.userId && (
                <Image
                  src={msg.picture}
                  w={10}
                  h={10}
                  borderRadius="100%"
                  cursor="pointer"
                  onClick={() => {
                    window.location.href = `user/${msg.userId}`;
                  }}
                />
              )}

              <MessageContainer msg={msg} />
            </Flex>
          ))}
        </Flex>
      ) : (
        <Loading />
      )}

      <Flex
        w="100%"
        justifyContent="center"
        bottom={5}
        backgroundColor="#fafafa"
      >
        <InputGroup w="95%">
          <Input
            borderRadius="15px"
            placeholder="Message..."
            h="50px"
            borderColor="#b6b6b6"
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
            value={messageText}
          />

          <InputRightElement
            display="flex"
            h="100%"
            w="7%"
            alignItems="center"
            cursor="pointer"
            onClick={handleSendMessage}
          >
            <Text color="#0095f6" fontWeight="bold" padding={2}>
              Send
            </Text>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default ChatComponent;
