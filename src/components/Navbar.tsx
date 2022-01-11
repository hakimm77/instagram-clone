import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  HomeIcon,
  ChatIcon,
  UploadIcon,
  ExploreIcon,
  SearchIcon,
} from "../assets/NavItems";
import uploadNewPost from "../helpers/uploadNewPost";

const reader = new FileReader();

const Navbar = () => {
  const inputRef: any = useRef();
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const navItems = [
    {
      icon: <HomeIcon />,
      run: () => {
        window.location.href = "/home";
      },
      svg: true,
    },
    {
      icon: <ChatIcon />,
      run: () => {
        window.location.href = "/chat";
      },
      svg: true,
    },
    {
      icon: <UploadIcon />,
      run: () => {
        inputRef.current?.click();
      },
      svg: true,
    },
    {
      icon: <ExploreIcon />,
      run: () => {
        window.location.href = "/explore";
      },
      svg: true,
    },
    {
      icon: require("../assets/profile-icon.jpg"),
      run: () => {
        window.location.href = "/profile";
      },
      svg: false,
    },
  ];

  useEffect(() => {
    if (selectedImage) {
      uploadNewPost(selectedImage, setSelectedImage);
    }
  }, [selectedImage]);

  return (
    <Flex
      flexDir="row"
      justifyContent="center"
      w="100%"
      h="70px"
      borderBottom="1px solid #d6d6d6"
    >
      <Flex
        flexDir="row"
        h="70px"
        justifyContent="space-around"
        alignItems="center"
        w="80%"
      >
        <Image
          src={require("../assets/instagram-icon.jpg")}
          width={125}
          height="65px"
        />

        <Box>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>

            <Input
              border="1px solid gray"
              backgroundColor="#efefef"
              w={300}
              h="40px"
              placeholder="Search"
            />
          </InputGroup>
        </Box>

        <Flex flexDir="row">
          {navItems.map((item, index) => (
            <Box key={index} p={3} onClick={item.run}>
              {item.svg ? (
                item.icon
              ) : (
                <Image src={item.icon} w={7} h={7} cursor="pointer" />
              )}
            </Box>
          ))}
        </Flex>
      </Flex>

      <Input
        ref={inputRef}
        type="file"
        display="none"
        onChange={(e: any) => {
          setSelectedImage(e.target.files[0]);
        }}
      />
    </Flex>
  );
};

export default Navbar;
