import { DefaultIcon, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import PostCommentsComponent from "../../components/PostCommentComponent";
import getPost from "../../helpers/getPost";

interface CommentType {
  user: string;
  comment: string;
  name: string;
  id: string;
}

interface PostType {
  user: string;
  url: string;
  caption: string;
  likes: number;
  usersLiked: Array<string | null>;
  id: string;
  comments: Array<CommentType>;
}

const PostScreen: React.FC<{ match: any }> = ({ match }) => {
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    getPost(match.params.id, setPost);
  }, [post]);

  return (
    <Layout>
      {post ? (
        <Flex
          flexDir="column"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          {post && (
            <Flex flexDir="column" width="80%">
              <PostCommentsComponent post={post} postId={match.params.id} />
            </Flex>
          )}
        </Flex>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};
export default PostScreen;
