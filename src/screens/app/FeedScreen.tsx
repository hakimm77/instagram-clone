import { Flex, Image, Text } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import PostComponent from "../../components/PostComponent";
import { db } from "../../firebase/firebaseConfig";
import getPosts from "../../helpers/getPosts";
import { PostType } from "../../types";

const FeedScreen: React.FC = () => {
  const [posts, setPosts] = useState<Array<PostType>>();

  useEffect(() => {
    getPosts().then((arr) => {
      setPosts(arr);
    });
  }, [posts]);

  return (
    <Layout>
      {posts?.length ? (
        <Flex mt="20px" justifyContent="center" w="100%">
          <Flex flexDir="column">
            {posts.map((post) => (
              <PostComponent post={post} />
            ))}
          </Flex>
        </Flex>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default FeedScreen;
