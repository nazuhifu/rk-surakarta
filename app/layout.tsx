import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import BackToTopButton from "@/components/back-to-top-button";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <title>RK Surakarta</title>
        <meta name="description" content="Menjadi inkubator pemimpin masa depan Indonesia yang siap berkontribusi dalam transformasi dan pembangunan Bangsa menuju Indonesia Maju." />
        <link rel="icon" href="/images/icon.png" />
        <link href="/fonts/KFGQPCUthmanicScriptHAFSRegular.otf" rel="stylesheet" />

        {/* Open Graph Meta Tags */}
        <meta property="og:url" content="https://rksurakarta.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RK Surakarta" />
        <meta property="og:description" content="Menjadi inkubator pemimpin masa depan Indonesia yang siap berkontribusi dalam transformasi dan pembangunan Bangsa menuju Indonesia Maju." />
        <meta property="og:image" content="https://rksurakarta.vercel.app/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="RK Surakarta" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="rksurakarta.vercel.app" />
        <meta property="twitter:url" content="https://rksurakarta.vercel.app" />
        <meta name="twitter:title" content="RK Surakarta" />
        <meta name="twitter:description" content="Menjadi inkubator pemimpin masa depan Indonesia yang siap berkontribusi dalam transformasi dan pembangunan Bangsa menuju Indonesia Maju." />
        <meta name="twitter:image" content="https://rksurakarta.vercel.app/images/og-image.png" />

        <style>
          {`
            @font-face {
              font-family: 'Uthmanic';
              src: url('/fonts/KFGQPCUthmanicScriptHAFSRegular.otf') format('opentype');
            }

            .font-arabic {
              font-family: 'Uthmanic', serif;
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>

        <BackToTopButton />

        <Script id="reveal-animation">
          {`
            function reveal() {
              var reveals = document.querySelectorAll(".reveal");
              for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                  reveals[i].classList.add("active");
                }
              }
            }
            window.addEventListener("scroll", reveal);
            reveal();
          `}
        </Script>
      </body>
    </html>
  );
}
