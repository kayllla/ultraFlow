import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { FestivalProvider } from "@/context/FestivalContext";
import { PlanProvider } from "@/context/PlanContext";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import WhiplashBackdrop from "@/components/WhiplashBackdrop";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UltraFlow — Your Ultra Miami Route",
  description:
    "Turn your Spotify listening habits into a personalized Ultra Miami festival route.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <FestivalProvider>
          <PlanProvider>
            <AudioPlayerProvider>
              <WhiplashBackdrop />
              {children}
            </AudioPlayerProvider>
          </PlanProvider>
        </FestivalProvider>
      </body>
    </html>
  );
}
