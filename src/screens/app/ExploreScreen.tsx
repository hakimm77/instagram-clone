import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import getPosts from "../../helpers/getPosts";
import { PostType } from "../../types";

const ExploreScreen: React.FC = () => {
  const [posts, setPosts] = useState<Array<PostType>>();

  useEffect(() => {
    getPosts().then((arr) => {
      setPosts(arr);
    });
  }, []);

  return (
    <Layout>
      <Flex justifyContent="center" w="100%">
        {posts?.length ? (
          <Flex flexDir="row" flexWrap="wrap" w="70%">
            {posts.map((post) => (
              <Image
                w="270px"
                h="250px"
                src={post.url}
                margin={5}
                cursor="pointer"
                objectFit="cover"
                onClick={() => {
                  window.location.href = `https://instagram-clone-8f59f.web.app/post/${post.id}`;
                }}
              />
            ))}
          </Flex>
        ) : (
          <Loading />
        )}
      </Flex>
    </Layout>
  );
};

export default ExploreScreen;
