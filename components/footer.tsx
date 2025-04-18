import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Kolom 1: RK Surakarta */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/images/logo.png" alt="Logo RK Surakarta" className="w-12" />
                            <span className="text-2xl font-bold">RK Surakarta</span>
                        </div>
                        <p className="text-muted-foreground">Menjadi inkubator pemimpin masa depan Indonesia yang siap berkontribusi dalam transformasi dan pembangunan Bangsa menuju Indonesia Maju.</p>
                    </div>

                    {/* Kolom 2: Tentang & Contact Us */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Tentang */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Tautan</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-muted-foreground hover:text-primary">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#tentang-kami" className="text-muted-foreground hover:text-primary">
                                        Tentang Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/awardees" className="text-muted-foreground hover:text-primary">
                                        Awardees
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/berita" className="text-muted-foreground hover:text-primary">
                                        Berita
                                    </Link>
                                </li>
                                <li>
                                    <Link href="pagi-kubro" className="text-muted-foreground hover:text-primary">
                                        Al-Matsurat Pagi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="sore-kubro" className="text-muted-foreground hover:text-primary">
                                        Al-Matsurat Sore
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Hubungi Kami</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <Link href="https://instagram.com/rksurakarta" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary" title="Follow us on Instagram">
                                        <Instagram className="h-5 text-primary" />
                                        <span>Instagram</span>
                                    </Link>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Link href="https://maps.app.goo.gl/YUFTpEDmVa9gqZGT8" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary" title="Visit us on Google Maps">
                                        <MapPin className="h-5 text-primary mt-0.5 hover:text-primary" />
                                        <span className="text-muted-foreground">Gg. Waru No.47, Jebres, Kota Surakarta</span>
                                    </Link>
                                </li>
                                <li className="flex items-center gap-3">
                                    <a href="mailto:info@rumahkepemimpinan.org" className="flex items-center gap-2 text-muted-foreground hover:text-primary" title="Send an email">
                                        <Mail className="h-5 text-primary" />
                                        <span>info@rumahkepemimpinan.org</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t dark:border-gray-800 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} RK Surakarta</p>
                    <p className="flex justify-center items-center gap-2">
                        Made with 
                        <span className="text-red-500 animate-pulse text-xl hover:scale-110 transition-all duration-500"> 
                            &hearts;
                        </span> 
                        by 
                        <a 
                            href="https://instagram.com/nazuhifu" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary font-semibold"
                        >
                            Nazuhifu
                        </a>
                    </p>
                </div>

            </div>
        </footer>
    );
}
