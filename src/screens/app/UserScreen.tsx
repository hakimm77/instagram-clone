import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import getPosts from "../../helpers/getPosts";
import getUserInfo from "../../helpers/getUserInfo";
import logout from "../../helpers/logout";
import { PostType, UserType } from "../../types";

const UserScreen: React.FC<{ match: any }> = ({ match }) => {
  const [user, setUser] = useState<UserType | undefined>();
  const [userId, setUserId] = useState(localStorage.getItem("USER"));
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getUserInfo(match.params.id, setUser);

    getPosts().then((arr) => {
      setPosts(arr);
    });
  }, []);

  return (
    <Layout>
      {user ? (
        <Flex
          mt={10}
          flexDir="column"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Flex w="60%" flexDir="column">
            <Flex
              flexDir="row"
              justifyContent="space-between"
              w="100%"
              mb={10}
              pb={5}
              borderBottom="2px solid #dadada"
            >
              <Image
                src={user.profilePic}
                w={150}
                h={150}
                borderRadius="100%"
                objectFit="cover"
              />

              <>
                <Flex flexDir="column">
                  <Flex flexDir="row" alignItems="center" w={700}>
                    <Text fontSize={30} paddingRight={5}>
                      {user.name}
                    </Text>
                    {userId === match.params.id && (
                      <Button
                        backgroundColor="#fafafa"
                        border="1px solid gray"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    )}
                  </Flex>
                  {posts?.length && (
                    <Text paddingTop={5} display="flex" flexDir="row">
                      <Text fontWeight="bold" paddingRight={1}>
                        {posts.filter((e) => e.user === match.params.id).length}
                      </Text>
                      posts
                    </Text>
                  )}
                </Flex>
              </>
            </Flex>

            <Flex flexDir="row" flexWrap="wrap" w="100%">
              {posts
                .filter((e) => e.user === match.params.id)
                .map((post) => (
                  <Image
                    w="270px"
                    h="250px"
                    src={post.url}
                    margin={5}
                    cursor="pointer"
                    objectFit="cover"
                    onClick={() => {
                      window.location.href = `http://localhost:3000/post/${post.id}`;
                    }}
                  />
                ))}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default UserScreen;
