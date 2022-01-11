import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CommentIcon, LikeIcon } from "../assets/NavItems";
import getUserInfo from "../helpers/getUserInfo";

interface PostType {
  post: {
    user: string;
    url: string;
    caption: string;
  };
}

interface UserType {
  email: string;
  id: string;
  name: string;
  profilePic: string;
}

const PostComponent: React.FC<PostType> = ({ post }) => {
  const [user, setUser] = useState<UserType | undefined>();
  const [postLiked, setPostLiked] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo(post.user, setUser);
  }, []);

  return (
    <Flex flexDir="column" width={600} mb="30px" border="1px solid #dadada">
      {user && (
        <>
          <Flex flexDir="row" alignItems="center">
            <Image
              src={user.profilePic}
              w={10}
              h={10}
              margin={2}
              borderRadius="100%"
            />
            <Text fontWeight="bold" cursor="pointer">
              {user.name}
            </Text>
          </Flex>

          <Image
            src={post.url}
            w="100%"
            h={600}
            onDoubleClick={() => {
              setPostLiked(true);
            }}
          />

          <Flex flexDir="row" alignItems="center">
            <Box
              padding={2}
              onClick={() => {
                setPostLiked((e) => (e ? false : true));
              }}
            >
              <LikeIcon liked={postLiked} />
            </Box>

            <Box padding={2}>
              <CommentIcon />
            </Box>
          </Flex>

          <Flex
            flexDir="row"
            alignItems="center"
            flexWrap="wrap"
            wordBreak="break-word"
            padding={2}
          >
            <Text fontWeight="bold" cursor="pointer">
              {user.name}
            </Text>
            <Text fontSize={15} paddingLeft={1}>
              {post.caption}
            </Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default PostComponent;
