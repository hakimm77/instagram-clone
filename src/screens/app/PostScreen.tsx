import { DefaultIcon, Flex, Text } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import PostCommentsComponent from "../../components/PostCommentComponent";
import { db } from "../../firebase/firebaseConfig";
import { PostType } from "../../types";

const PostScreen: React.FC<{ match: any }> = ({ match }) => {
  const [post, setPost] = useState<PostType | null>();

  useEffect(() => {
    setPost(null);
    onSnapshot(doc(db, `posts/${match.params.id}`), (post) => {
      setPost(post.data() as PostType);
    });
  }, []);

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
