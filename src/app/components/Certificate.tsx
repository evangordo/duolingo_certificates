import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Stat,
  StatNumber,
  useColorModeValue,
  Flex,
  Divider,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { DownloadIcon } from "@chakra-ui/icons";

export default function Certificate({ user }: any) {
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  });
  return (
    <>
      <Box
        mt={-4}
        maxW="800px"
        mx="auto"
        p={8}
        borderWidth={4}
        borderColor={"#58ca05"}
        borderStyle="double"
        boxShadow="2xl"
        bg={useColorModeValue("white", "gray.800")}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={4}
          left={4}
          right={4}
          bottom={4}
          border="4px solid"
          // borderColor="black"
          pointerEvents="none"
          zIndex={1}
        />

        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          opacity={0.05}
          fontSize="200px"
          color="gray.200"
          zIndex={0}
        >
          🌍
        </Box>

        <Heading
          bg=" #59cb09"
          fontSize={{ base: "xl", md: "5xl" }}
          color={"white"}
          rounded={"lg"}
          boxShadow={"3xl"}
          p={4}
          textAlign="center"
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
          border="2px solid #3a8e05"
          borderRadius="md"
          mb={4}
        >
          Duolingo Certificate of Achievement
        </Heading>
        <Text mt={2} fontStyle="italic">
          This certifies that
        </Text>
        <Heading> {user.name}</Heading>
        <Text fontStyle="italic">
          has scored the following achievements in Duolingo
        </Text>
        <SimpleGrid columns={2}>
          <StatBox
            bg="#fee8c0"
            emoji={user.streak > 0 ? "🔥" : user.streak === 0 ? "❄️" : "❓"}
            stat={user.streak}
            text={isDesktop ? "Current Streak" : "Streak"}
          />
          <StatBox bg="#c3ebfe" emoji="⭐️" stat={42232} text="Total XP" />
        </SimpleGrid>
        <Heading mt={4} fontSize={"2xl"}>
          Languages mastered with their native tongue being
          {user.fromLanguage}
        </Heading>
        <LanguagesMastered language="Italian" flag="🇮🇹" stat={43220} />
        <LanguagesMastered language="French" flag="🇫🇷" stat={7820} />
        <Text mt={2} mb={2} fontStyle="italic" fontWeight="bold">
          {user.motivation !== null && "Motivation:" + " " + user.motivation}
        </Text>
        <Divider />
        <Flex justifyContent={"space-between"} m={4}>
          <Text fontSize={{ base: "lg", md: "xl" }} fontStyle={"italic"}>
            Acitve member since: 12/07/21
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }} fontStyle={"italic"}>
            🖊️ issued: 12/07/21
          </Text>
        </Flex>
      </Box>
      <DownloadButton />
    </>
  );
}

interface StatBoxProps {
  bg: string;
  stat: number;
  text: string;
  emoji: string;
}

const StatBox = ({ bg, stat, text, emoji }: StatBoxProps) => {
  return (
    <Box
      borderRadius={"lg"}
      bg={bg}
      m={4}
      borderWidth={"2px"}
      borderColor={"black"}
    >
      <Stat>
        <Flex
          display={"flex"}
          justifyContent={"center"}
          textAlign={"center"}
          gap={1}
        >
          <Text fontSize={{ base: "lg", md: "3xl" }}> {emoji}</Text>
          <StatNumber fontSize={{ base: "lg", md: "3xl" }}>{stat}</StatNumber>
        </Flex>
      </Stat>

      <Text mb={1} fontWeight={"bold"}>
        {text}
      </Text>
    </Box>
  );
};

interface LanguagesMasteredProps {
  language: string;
  flag: string;
  stat: number;
}

const LanguagesMastered = ({
  language,
  flag,
  stat,
}: LanguagesMasteredProps) => {
  return (
    <Box
      borderRadius={"lg"}
      bg="#eff1f3"
      p={2}
      m={4}
      borderWidth={"2px"}
      borderColor={"black"}
    >
      <Flex gap={2} p={2} textAlign={"center"} justifyContent={"space-between"}>
        <Flex alignItems="center" gap={2}>
          <Heading textAlign={"start"} fontSize={{ base: "lg", md: "3xl" }}>
            {language}
          </Heading>
          <Text fontSize={{ base: "lg", md: "3xl" }}>{flag}</Text>
        </Flex>

        <Flex alignItems="center" style={{ textAlign: "end" }}>
          <Stat>
            <Flex alignItems="center" gap={2}>
              <StatNumber fontSize={{ base: "lg", md: "3xl" }}>
                ⭐️ {stat} XP
              </StatNumber>
            </Flex>
          </Stat>
        </Flex>
      </Flex>
    </Box>
  );
};

const DownloadButton = () => {
  return (
    <Button
      mx="auto"
      color={"green"}
      bg="black"
      leftIcon={<DownloadIcon />}
      mt={4}
      maxW={"md"}
    >
      Download
    </Button>
  );
};
