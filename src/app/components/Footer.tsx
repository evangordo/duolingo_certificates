"use client";
// import { FaGithub } from "react-icons/fa";

import { Box, Container, Stack, Text } from "@chakra-ui/react";
// import Link from "next/link";

export default function Footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={"xl"}
        py={6}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={"center"}
        mt="auto"
        width="100%"
        align={"center"}
      >
        <Text ml={4}>Made by evangordo </Text>

        {/* <Link
          href={"https://github.com/evangordo"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </Link> */}
        <Stack direction={"row"} spacing={6}></Stack>
      </Container>
    </Box>
  );
}
