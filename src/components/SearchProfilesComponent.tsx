import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getUsers from "../helpers/getUsers";

interface UserType {
  email: string;
  id: string;
  name: string;
  profilePic: string;
}

const SearcheProfilesComponent: React.FC<{
  searchWord: string | undefined;
}> = ({ searchWord }) => {
  const [searchRes, setSearchRes] = useState<Array<UserType> | undefined>();

  useEffect(() => {
    if (searchWord) {
      getUsers().then((arr) => {
        let result = arr.filter((e) =>
          e.name.toUpperCase().includes(searchWord.toUpperCase())
        );

        setSearchRes(result);
      });
    }
  }, [searchWord]);

  return (
    <Flex
      flexDir="column"
      position="absolute"
      w={300}
      maxH={300}
      backgroundColor="#fafafa"
      border="1px solid #dadada"
      overflowX="auto"
      zIndex={3}
    >
      {searchRes?.length ? (
        searchRes.map((res) => (
          <Flex
            flexDir="row"
            w="100%"
            alignItems="center"
            cursor="pointer"
            onClick={() => {
              window.location.href = `/user/${res.id}`;
            }}
          >
            <Image
              src={res.profilePic}
              w={10}
              h={10}
              margin={2}
              borderRadius="100%"
            />
            <Text paddingLeft={2} fontWeight="bold">
              {res.name}
            </Text>
          </Flex>
        ))
      ) : (
        <Text color="gray" padding={5}>
          No results found.
        </Text>
      )}
    </Flex>
  );
};

export default SearcheProfilesComponent;
