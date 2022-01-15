import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CommentIcon, LikeIcon } from "../assets/NavItems";
import getUserInfo from "../helpers/getUserInfo";
import likePost from "../helpers/likePost";

interface PostType {
  post: {
    user: string;
    url: string;
    caption: string;
    likes: number;
    usersLiked: Array<string | null>;
    id: string;
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
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("USER")
  );

  useEffect(() => {
    getUserInfo(post.user, setUser);
  }, []);

  const handlePostLike = () => {
    likePost(post, userId);
  };

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
            onDoubleClick={handlePostLike}
            objectFit="cover"
          />

          <Flex flexDir="column">
            <Flex flexDir="row" alignItems="center">
              <Flex
                padding={2}
                onClick={handlePostLike}
                flexDir="row"
                alignItems="center"
              >
                <LikeIcon
                  liked={post.usersLiked.includes(localStorage.getItem("USER"))}
                />
              </Flex>

              <Box
                padding={2}
                onClick={() => {
                  window.location.href = `/post/${post.id}`;
                }}
              >
                <CommentIcon />
              </Box>
            </Flex>

            <Text paddingLeft={2} fontWeight="bold" fontSize={17}>
              {post.likes !== 0 && `Liked by ${post.likes}`}
            </Text>
          </Flex>

          <Flex
            flexDir="row"
            alignItems="center"
            flexWrap="wrap"
            wordBreak="break-word"
            padding={3}
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
