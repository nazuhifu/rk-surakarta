import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import BackToTopButton from "@/components/back-to-top-button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RK Surakarta",
    description: "Menjadi inkubator pemimpin masa depan Indonesia yang siap berkontribusi dalam transformasi dan pembangunan Bangsa menuju Indonesia Maju.",
    openGraph: {
        type: "website",
        url: "https://rksurakarta.vercel.app",
        title: "RK Surakarta",
        siteName: "RK Surakarta",
        locale: "id_ID",
    },
    twitter: {
        card: "summary_large_image",
        title: "RK Surakarta",
        site: "https://rksurakarta.vercel.app",
    },
    icons: {
        icon: "/images/icon.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <Navbar />
                    {children}
                </ThemeProvider>
                <BackToTopButton />
                <Footer />

                <Script id="reveal-animation">{`
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
                `}</Script>
            </body>
        </html>
    );
}
