import type {Metadata} from "next";
import {Inter, Inter_Tight} from "next/font/google";
import "./globals.css";
import Head from "next/head";
import LenisScriptLoader from "@/utils/LenisScriptLoader";

const interSans = Inter({variable: "--font-inter-sans", subsets: ["latin"]});
const interTight = Inter_Tight({variable: "--font-inter-tight", subsets: ["latin"]});

export const metadata: Metadata = {
    title: "LVLX - Monetize your traffic",
    description: "LVLX is a platform that allows you to monetize your traffic by connecting with advertisers and managing your campaigns effectively.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${interSans.variable} ${interTight.variable}`}>
        <Head>
            <link
                rel="preload"
                as="video"
                href="/girl.mp4"
                type="video/mp4"
            />
        </Head>
        <body>
        <LenisScriptLoader/>
        {children}
        </body>
        </html>
    );
}
