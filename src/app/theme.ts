import { extendTheme } from "@chakra-ui/react";
import { Fredoka } from "next/font/google";

const nextFont = Fredoka({
  weight: ["400"],
  subsets: ["latin"],
});

const theme = extendTheme({
  fonts: {
    body: nextFont.style.fontFamily,
    heading: nextFont.style.fontFamily,
  },
});

export default theme;
