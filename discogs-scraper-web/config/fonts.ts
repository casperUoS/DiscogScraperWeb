import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Oswald as FontOswald,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontOswald = FontOswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});
