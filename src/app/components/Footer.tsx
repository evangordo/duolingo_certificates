"use client";
import { FaGithub } from "react-icons/fa";

import { Box, Container, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Text>Made by evangordo </Text>

        <Link href={"/"}>
          {" "}
          <FaGithub size={24} />
        </Link>
        <Stack direction={"row"} spacing={6}></Stack>
      </Container>
    </Box>
  );
}
