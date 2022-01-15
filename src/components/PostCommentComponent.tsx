import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CommentIcon, LikeIcon } from "../assets/NavItems";
import getUserInfo from "../helpers/getUserInfo";
import likePost from "../helpers/likePost";
import postComment from "../helpers/postComment";

interface CommentType {
  user: string;
  comment: string;
}

interface PostType {
  post: {
    user: string;
    url: string;
    caption: string;
    likes: number;
    usersLiked: Array<string | null>;
    id: string;
    comments: Array<CommentType>;
  };
  postId: string;
}

interface UserType {
  email: string;
  id: string;
  name: string;
  profilePic: string;
}

interface CommentType {
  user: string;
  comment: string;
  name: string;
  id: string;
}

const PostCommentsComponent: React.FC<PostType> = ({ post, postId }) => {
  const [user, setUser] = useState<UserType | undefined>();
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("USER")
  );
  const [commentTxt, setCommenTxt] = useState<string>("");

  useEffect(() => {
    getUserInfo(post.user, setUser);
  }, []);

  const handlePostLike = () => {
    likePost(post, userId);
  };

  const handleAddingComment = async () => {
    if (commentTxt) {
      await postComment(postId, userId, commentTxt, post.comments, user?.name);
      setCommenTxt("");
    }
  };

  return (
    <Flex flexDir="row" mt={5} border="1px solid #dadada">
      {user && (
        <>
          <Image
            src={post.url}
            w="60%"
            h={600}
            onDoubleClick={handlePostLike}
            objectFit="cover"
          />

          <Flex flexDir="column" w="40%">
            <Flex
              flexDir="row"
              alignItems="center"
              borderBottom="1.5px solid #dfdfdf"
            >
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

            <Flex h="90%" flexDir="column" marginLeft={2} marginTop={2}>
              {post.comments.map((comment) => (
                <>
                  <Flex flexDir="row" mb={3}>
                    <Text fontWeight="bold" paddingRight={2} cursor="pointer">
                      {comment.name}
                    </Text>
                    <Text wordBreak="break-all"> {comment.comment}</Text>
                  </Flex>
                </>
              ))}
            </Flex>

            <Flex
              flexDir="row"
              alignItems="center"
              borderTop="1.5px solid #dfdfdf"
            >
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

              <Box padding={2}>
                <CommentIcon />
              </Box>
            </Flex>

            <Text paddingLeft={2} fontWeight="bold" fontSize={17}>
              {post.likes !== 0 && `Liked by ${post.likes}`}
            </Text>

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

            <InputGroup display="flex" flexDir="row">
              <Input
                placeholder="Add your comment..."
                w="100%"
                h={50}
                borderColor="#b1b1b1"
                onChange={(e) => {
                  setCommenTxt(e.target.value);
                }}
                value={commentTxt}
              />

              <InputRightElement
                h="100%"
                w="10%"
                cursor="pointer"
                onClick={handleAddingComment}
              >
                <Text color="#0095f6" fontWeight="bold">
                  Post
                </Text>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default PostCommentsComponent;
