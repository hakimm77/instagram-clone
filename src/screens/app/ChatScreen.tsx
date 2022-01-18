import { Flex, Text } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ChatComponent from "../../components/ChatComponent";
import Layout from "../../components/Layout";
import { db } from "../../firebase/firebaseConfig";
import { MessageType } from "../../types";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Array<MessageType>>([]);

  useEffect(() => {
    setMessages([]);
    onSnapshot(
      query(collection(db, "chat"), orderBy("timestamp", "desc")),
      (messages) => {
        setMessages([]);
        messages.forEach(async (res) => {
          const message = (await res.data()) || [];

          setMessages((p: any) => [...p, message] as Array<MessageType>);
        });
      }
    );
  }, []);

  return (
    <Layout>
      <Flex w="100%" justifyContent="center">
        <ChatComponent messages={messages} />
      </Flex>
    </Layout>
  );
};

export default ChatScreen;
