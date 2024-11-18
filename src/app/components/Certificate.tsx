import { useRef } from "react";
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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { getFlag } from "../utils/flags";
import { DownloadIcon } from "@chakra-ui/icons";

interface StreakData {
  currentStreak: {
    startDate: string;
    length: number;
  };
}

interface Courses {
  title: string;
  learningLanguage?: string;
  xp: number;
}

interface UserProps {
  name: string;
  streak: number | null;
  fromLanguage: string;
  motivation: string | null;
  streakData: StreakData;
  totalXp: number;
  courses: Courses[];
}

interface LanguagesMasteredProps {
  language: string;
  flag: string;
  stat: number;
}

interface StatBoxProps {
  bg: string;
  stat: number;
  text: string;
  emoji: string;
  boxShadow: string;
}

export default function Certificate({ user }: { user: UserProps }) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (certificateRef.current) {
      try {
        const box = certificateRef.current.getBoundingClientRect();

        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          width: box.width,
          height: box.height,
          windowWidth: box.width,
          windowHeight: box.height,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
        });

        const imgData = canvas.toDataURL("image/png", 1.0);

        const pdfWidth = box.width;
        const pdfHeight = box.height;

        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
          unit: "px",
          format: [pdfWidth, pdfHeight],
          hotfixes: ["px_scaling"],
        });

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");

        pdf.save(`duolingo_achievement_certificate.pdf`);
      } catch (error) {
        console.error("failed to generate PDF", error);
      }
    }
  };
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  });
  return (
    <>
      <Box
        ref={certificateRef}
        mt={-4}
        maxW="800px"
        mx="auto"
        p={8}
        borderWidth={4}
        borderColor={"#57cc02"}
        // borderStyle="double"
        rounded={"2xl"}
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
          borderColor="#37454e"
          rounded={"2xl"}
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
          bg="#57cc02"
          fontSize={{ base: "xl", md: "5xl" }}
          color="white"
          rounded="2xl"
          p={4}
          textAlign="center"
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
          boxShadow="0px 6px 0px rgb(88, 167, 0), 0px 8px 15px rgba(0, 0, 0, 0.2)"
          borderRadius="2xl"
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
            bg="#ff9600"
            emoji={user.streak ? (user.streak > 0 ? "🔥" : "❄️") : "❄️"}
            stat={user.streak ?? 0}
            text={isDesktop ? "Current Streak" : "Streak"}
            boxShadow={"rgb(203, 120, 0)"}
          />
          <StatBox
            bg="#49c0f8"
            emoji="⭐️"
            stat={user.totalXp}
            text="Total XP"
            boxShadow={"rgb(23, 154, 208)"}
          />
        </SimpleGrid>
        <Heading mt={4} fontSize={{ base: "md", md: "2xl" }}>
          Languages mastered with their native tongue being: {""}
          {getFlag(user.fromLanguage)}
        </Heading>

        {user.courses.map((iter) => (
          <div key={iter.title}>
            <LanguagesMastered
              language={iter.title}
              flag={getFlag(iter.learningLanguage)}
              stat={iter.xp}
            />
          </div>
        ))}

        <Text mt={4} mb={2} fontStyle="italic" fontWeight="bold">
          {user.motivation ? "Motivation: " + user.motivation : null}
        </Text>
        <Divider />
        <Flex justifyContent={"space-between"} m={4}>
          <Text fontSize={{ base: "md", md: "xl" }} fontStyle={"italic"}>
            {user.streakData?.currentStreak?.startDate &&
              `Active streak since: ${new Date(
                user.streakData.currentStreak.startDate
              ).toLocaleDateString()}`}
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }} fontStyle={"italic"}>
            🖊️ issued: {new Date().toLocaleDateString()}
          </Text>
        </Flex>
      </Box>
      <DownloadButton onClick={handleDownloadPDF} />
    </>
  );
}

const StatBox = ({ bg, stat, text, emoji, boxShadow }: StatBoxProps) => {
  return (
    <Box
      borderRadius="lg"
      bg={bg}
      rounded="3xl"
      m={4}
      borderColor="rgb(229, 229, 229)"
      boxShadow={`0px 4px 0px ${boxShadow}, 0px 8px 15px rgba(0, 0, 0, 0.2)`}
    >
      <Stat>
        <Flex
          display={"flex"}
          justifyContent={"center"}
          textAlign={"center"}
          gap={1}
          mt={2}
        >
          <Text fontSize={{ base: "lg", md: "3xl" }}> {emoji}</Text>
          <StatNumber fontSize={{ base: "lg", md: "3xl" }} color={"white"}>
            {stat}
          </StatNumber>
        </Flex>
      </Stat>

      <Text mb={2} p={1} fontSize={"lg"} fontWeight={"bold"}>
        {text}
      </Text>
    </Box>
  );
};

const LanguagesMastered = ({
  language,
  flag,
  stat,
}: LanguagesMasteredProps) => {
  return (
    <Box
      mx="auto"
      maxW={"2xl"}
      mt={8}
      rounded="3xl"
      bg="#eff1f3"
      p={2}
      borderWidth={"2px"}
      borderColor="rgb(229, 229, 229)"
      boxShadow="0px 4px 0px rgb(229, 229, 229), 0px 8px 15px rgba(0, 0, 0, 0.2)"
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

const DownloadButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      mx="auto"
      color={"#5aca00"}
      bg="black"
      leftIcon={<DownloadIcon />}
      mt={4}
      maxW={"md"}
      onClick={onClick}
    >
      Download
    </Button>
  );
};
