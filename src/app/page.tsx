"use client";
import { useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import "./globals.css";
import Certificate from "./components/Certificate";
import Footer from "./components/Footer";
import Confetti from "react-confetti-boom";

export default function Home() {
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [confettiShown, setConfettiShown] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await fetch(`/api/duolingo/${username}`);
      if (!response.ok) {
        toast({
          title: `Unable to fetch user`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      const data = await response.json();
      const user = data.users[0];
      setUserData(user);
      if (!confettiShown) {
        setConfettiShown(true);
      }
    } catch (error) {
      console.error("error fetching user", error);
      setError("Could not find user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxW={"4xl"}
      textAlign={"center"}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Stack
        textAlign={"center"}
        spacing={{ base: 8, md: 4 }}
        py={{ base: 20, md: 14 }}
        flex="1"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          color={"#59cb09"}
        >
          Duolingo
          <Text
            as={"span"}
            color={"black"}
            ml={2}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "20%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "#59cb09",
              zIndex: -1,
            }}
          >
            Certificates
          </Text>
          {""} 🌏
        </Heading>
        <Text fontSize={"lg"}>
          Generate an achievement cert based on your Duolingo stats
        </Text>
        <Center>
          <InputGroup size="lg" maxW={"md"} borderRadius={"lg"}>
            <Input
              pr="3rem"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputRightElement width="5.5rem">
              <Button
                size="lg"
                p={4}
                mr={0}
                textColor={"#59cb09"}
                onClick={fetchUserData}
                bg="black"
                isLoading={loading}
              >
                Generate
              </Button>
            </InputRightElement>
          </InputGroup>
        </Center>
      </Stack>
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}

      {userData && <Certificate user={userData} />}
      {userData && (
        <Confetti
          mode="boom"
          particleCount={440}
          shapeSize={44}
          colors={["#58ca05", "#c3ebfe"]}
          effectInterval={1000}
          spreadDeg={100}
          launchSpeed={2.1}
        />
      )}
      <Footer />
    </Container>
  );
}
