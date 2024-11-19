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
  useBreakpointValue,
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

  const fetchUserData = async () => {
    setLoading(true);
    setError("");
    setUserData(null);

    if (!username.trim()) {
      toast({
        title: "Please enter a username",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/duolingo/${username}`);
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: `Unable to fetch user`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      if (!data || !data.users || data.users.length === 0) {
        setError(`No user found with username "${username}"`);
        toast({
          title: "User not found",
          position: "top",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      const user = data.users[0];
      setUserData(user);
      setError("");
    } catch (error) {
      console.error("error fetching user", error);
      setError("Could not find user");
    } finally {
      setLoading(false);
    }
  };
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  });

  return (
    <Container
      maxW={"4xl"}
      textAlign={"center"}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Stack textAlign={"center"} spacing={4} py={8} flex="1">
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
          {""} 🌎
        </Heading>
        <Text fontSize={"lg"}>
          Generate an achievement certificate based on your Duolingo stats
        </Text>
        <Center>
          <InputGroup
            size="lg"
            maxW={"md"}
            borderRadius={"lg"}
            mb={2}
            borderColor="rgb(229, 229, 229)"
            boxShadow="0px 4px 0px rgb(229, 229, 229), 0px 8px 15px rgba(0, 0, 0, 0.2)"
            rounded={"2xl"}
            borderWidth={"2px"}
          >
            <Input
              pr="3rem"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              _focus={{ borderColor: "transparent", boxShadow: "none" }}
            />
            <InputRightElement width="5.5rem" rounded={"2xl"}>
              <Button
                size="lg"
                p={4}
                mr={0}
                textColor={"#59cb09"}
                onClick={fetchUserData}
                bg="black"
                isLoading={loading}
                rounded={"2xl"}
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
      {userData && isDesktop && (
        <Confetti
          mode="boom"
          particleCount={440}
          shapeSize={44}
          colors={["#57cc02", "#ff9600", "#49c0f8"]}
          effectInterval={1000}
          spreadDeg={100}
          launchSpeed={2.1}
        />
      )}
      <Footer />
    </Container>
  );
}
