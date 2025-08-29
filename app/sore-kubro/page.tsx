"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Moon } from "lucide-react";
import Link from "next/link";
import AyatCard from "@/components/ayat-card";

export default function SoreKubro() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from kubra.json
  useEffect(() => {
    fetch("/data/kubra.json")
      .then((res) => res.json())
      .then((data) => {
        const soreSection = data.sections.find((section: any) => section.time === "evening");
        setItems(soreSection ? soreSection.items : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Initialize scroll reveal on component mount
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent">
          <div className="container text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/100 text-primary dark:text-foreground text-sm font-medium mb-2">Al-Matsurat</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Al-Matsurat Sore Kubro</h1>
            <p className="text-md md:text-xl text-muted-foreground mb-6">Kumpulan doa dan dzikir sore hari yang dianjurkan untuk dibaca setiap sore.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link href="/pagi-kubro" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Al-Matsurat Pagi
                </Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Moon className="mr-2 h-4 w-4" />
                Al-Matsurat Sore
              </Button>
            </div>
          </div>
        </section>

        {/* Al-Mathurat Content */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-2 sm:px-4 text-base md:text-lg">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 reveal">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold flex items-center">
                  <Moon className="mr-2 h-5 w-5 text-primary" />
                  Al-Matsurat Sore
                </h2>
              </div>

              <div className="space-y-8">
                {loading ? (
                  <div className="text-center text-muted-foreground">Memuat dzikir & doa...</div>
                ) : items.length > 0 ? (
                  items.map((item, index) => (
                    <AyatCard key={item.id} title={item.title} repeat={item.repeat} arabicText={item.arabic} translation={item.translation_id} centered={item.title === "Ta'awudz" || item.title === "Basmalah"} isFirstCard={index === 0} />
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">Tidak ada data yang tersedia</div>
                )}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Button className="bg-secondary hover:bg-secondary/90">
                  <Link href="/pagi-kubro" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Al-Matsurat Pagi
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-semibold mb-6 text-center reveal">Keutamaan Berdzikir Pagi dan Petang</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all reveal">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Moon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Mendapat Perlindungan dari Allah</h3>
                </div>
                <p className="text-muted-foreground">Dzikir pagi dan petang menjadi tameng pelindung dari gangguan jin, sihir, dan segala keburukan yang tidak terlihat.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all reveal" style={{ transitionDelay: "0.1s" }}>
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Moon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Mendatangkan Ketenangan Hati</h3>
                </div>
                <p className="text-muted-foreground">Dengan mengingat Allah di waktu pagi dan petang, hati menjadi tenang, pikiran lebih jernih, dan jiwa lebih damai.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all reveal" style={{ transitionDelay: "0.2s" }}>
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Moon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Mengikuti Sunnah Rasulullah ﷺ</h3>
                </div>
                <p className="text-muted-foreground">Dzikir pagi dan petang merupakan amalan harian yang selalu dilakukan oleh Rasulullah ﷺ dan para sahabatnya.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all reveal" style={{ transitionDelay: "0.3s" }}>
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Moon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Mendekatkan Diri kepada Allah</h3>
                </div>
                <p className="text-muted-foreground">Dzikir secara konsisten memperkuat hubungan spiritual dengan Allah, menumbuhkan keimanan dan rasa tawakal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="flex justify-between">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Link>
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90">
                <Link href="/pagi-kubro" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Al-Matsurat Pagi
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
