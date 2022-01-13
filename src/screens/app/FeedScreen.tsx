import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import PostComponent from "../../components/PostComponent";
import getPosts from "../../helpers/getPosts";

interface PostType {
  user: string;
  url: string;
  caption: string;
  likes: number;
  usersLiked: Array<string | null>;
}

const FeedScreen = () => {
  const [posts, setPosts] = useState<Array<PostType>>();

  useEffect(() => {
    getPosts().then((arr) => {
      setPosts(arr);
    });
  }, [posts]);

  return (
    <Layout>
      {posts?.length ? (
        <Flex
          flexDir="row"
          mt="20px"
          ml="20%"
          justifyContent="space-around"
          w="80%"
        >
          <Flex flexDir="column">
            {posts.map((post) => (
              <PostComponent post={post} />
            ))}
          </Flex>

          <Flex flexDir="column">
            <Text>suggetions</Text>
          </Flex>
        </Flex>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default FeedScreen;
