import React from "react";
import { Text, Box, Button, Image, Flex } from "@chakra-ui/react";
function Navbar() {
  return (
    <Flex
      h="12vh"
      mt={10}
      ml={10}
      mr={10}
      boxShadow=" 0px 4px 8px rgba(0, 0, 0, 0.2)" bg='white'
    >
      <Box w="38vw">
        <Image
          mt={3}
          h={10}
          w={100}
          src="https://bitcoinworld.co.in/wp-content/uploads/1.-KoinX-Color-Logo-coin.jpg"
        />
      </Box>
      <Box>
        <Flex gap={10} mt={4}>
          <Text fontWeight={500}>Features</Text>
          <Text fontWeight={500}>Exchanges</Text>
          <Text fontWeight={500}>How it Works ?</Text>
          <Text fontWeight={500}>Blog</Text>
          <Text fontWeight={500}>About Us</Text>
          <Button
            mb={3}
            fontWeight={500}
            fontSize={20}
            borderColor="1px solid blue"
            color="blue"
          >
            Sign In
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Navbar;
