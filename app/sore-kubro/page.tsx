"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Moon } from "lucide-react";
import Link from "next/link";
import AyatCard from "@/components/ayat-card";
import BackToTopButton from "@/components/back-to-top-button";

export default function PagiKubro() {
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
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent">
                    <div className="container text-center">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/100 text-primary dark:text-foreground text-sm font-medium mb-2">Al-Matsurat</div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Al-Matsurat Sore Kubro</h1>
                        <p className="text-md md:text-xl text-muted-foreground mb-6">Kumpulan doa dan dzikir sore hari yang dianjurkan untuk dibaca setiap sore.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button className="bg-primary hover:bg-primary/90">
                                <Moon className="mr-2 h-4 w-4" />
                                Al-Matsurat Sore
                            </Button>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                <Link href="pagi-kubro" className="flex items-center">
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Al-Matsurat Pagi
                                </Link>
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
                                <AyatCard
                                    title=""
                                    repeat={1}
                                    arabicText="أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ"
                                    translation="Aku berlindung kepada Allah yang Maha Mendengar lagi Maha Mengetahui dari godaan setan yang terkutuk."
                                    centered
                                />
                                <AyatCard
                                    title="Al-Fatihah"
                                    repeat={1}
                                    arabicText="بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
                                    translation="Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang"
                                    centered
                                />
                                <AyatCard
                                    title="Al-Fatihah"
                                    repeat={1}
                                    arabicText=" ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ٢ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ٣ مَٰلِكِ يَوۡمِ ٱلدِّينِ ٤ إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ٥ ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ٦ صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ ٧"
                                    translation="Segala puji bagi Allah, Tuhan semesta alam (2). Maha Pemurah lagi Maha Penyayang (3). Yang menguasai hari pembalasan (4). Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan (5). Tunjukilah kami jalan yang lurus (6). (yaitu) jalan orang-orang yang telah Engkau anugerahkan nikmat kepada mereka, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat (7)."
                                />
                                <AyatCard
                                    title="Al-Baqarah"
                                    repeat={1}
                                    arabicText="بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
                                    translation="Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang."
                                    centered
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 1"
                                    repeat={1}
                                    arabicText="الٓمٓ"
                                    translation="Alif Laam Miim."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 2"
                                    repeat={1}
                                    arabicText="
                                        ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ"
                                    translation="Kitab (Al Qur'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 3"
                                    repeat={1}
                                    arabicText="ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ"
                                    translation="(yaitu) mereka yang beriman kepada yang gaib, yang mendirikan shalat dan menafkahkan sebahagian rezki yang Kami anugerahkan kepada mereka."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 4"
                                    repeat={1}
                                    arabicText="وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ"
                                    translation="Dan mereka yang beriman kepada Kitab (AlQur'an) yang telah diturunkan kepadamu dan Kitab-kitab yang telah diturunkan sebelummu, serta mereka yakin akan adanya (kehidupan) akhirat."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 5"
                                    repeat={1}
                                    arabicText="أُوْلَٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ وَأُوْلَٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ"
                                    translation="Mereka itulah yang tetap mendapat petunjuk dari Tuhan mereka, dan merekalah orang-orang yang beruntung."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 255"
                                    repeat={1}
                                    arabicText="ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُۚ لَا تَأۡخُذُهُۥ سِنَةٞ وَلَا نَوۡمٞۚ لَّهُۥ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ مَن ذَا ٱلَّذِي يَشۡفَعُ عِندَهُۥٓ إِلَّا بِإِذۡنِهِۦۚ يَعۡلَمُ مَا بَيۡنَ أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡۖ وَلَا يُحِيطُونَ بِشَيۡءٖ مِّنۡ عِلۡمِهِۦٓ إِلَّا بِمَا شَآءَۚ وَسِعَ كُرۡسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَۖ وَلَايَئُودُهُۥ حِفۡظُهُمَاۚ وَهُوَ ٱلۡعَلِيُّ ٱلۡعَظِيمُ"
                                    translation="Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafaat di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 256"
                                    repeat={1}
                                    arabicText="لَآ إِكۡرَاهَ فِي ٱلدِّينِۖ قَد تَّبَيَّنَ ٱلرُّشۡدُ مِنَ ٱلۡغَيِّۚ فَمَن يَكۡفُرۡ بِٱلطَّٰغُوتِ وَيُؤۡمِنۢ بِٱللَّهِ فَقَدِ ٱسۡتَمۡسَكَ بِٱلۡعُرۡوَةِ ٱلۡوُثۡقَىٰ لَا ٱنفِصَامَ لَهَاۗ وَٱللَّهُ سَمِيعٌ عَلِيمٌ"
                                    translation="Tidak ada paksaan untuk (memasuki) agama (Islam); sesungguhnya telah jelas jalan yang benar daripada jalan yang sesat. Karena itu barang siapa yang ingkar kepada Thaghut dan beriman kepada Allah, maka sesungguhnya ia telah berpegang kepada buhu tali yang amat kuat yang tidak akan putus. Dan Allah Maha Mendengar lagi Maha Mengetahui."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 257"
                                    repeat={1}
                                    arabicText="ٱللَّهُ وَلِيُّ ٱلَّذِينَ ءَامَنُواْ يُخۡرِجُهُم مِّنَ ٱلظُّلُمَٰتِ إِلَى ٱلنُّورِۖ وَٱلَّذِينَ كَفَرُوٓاْ أَوۡلِيَآؤُهُمُ ٱلطَّٰغُوتُ يُخۡرِجُونَهُم مِّنَ ٱلنُّورِ إِلَى ٱلظُّلُمَٰتِۗ أُوْلَٰٓئِكَ أَصۡحَٰبُ ٱلنَّارِۖ هُمۡ فِيهَا خَٰلِدُونَ"
                                    translation="Allah Pelindung orang-orang yang beriman; Dia mengeluarkan mereka dari kegelapan (kekafiran) kepada cahaya (iman). Dan orang-orang yang kafir, pelindung-pelindungnya ialah setan, yang mengeluarkan mereka dari cahaya kepada kegelapan (kekafiran). Mereka itu adalah penghuni neraka; mereka kekal di dalamnya."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 284"
                                    repeat={1}
                                    arabicText="لِّلَّهِ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ وَإِن تُبۡدُواْ مَا فِيٓ أَنفُسِكُمۡ أَوۡ تُخۡفُوهُ يُحَاسِبۡكُم بِهِ ٱللَّهُۖ فَيَغۡفِرُ لِمَن يَشَآءُ وَيُعَذِّبُ مَن يَشَآءُۗ وَٱللَّهُ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٌ"
                                    translation="Kepunyaan Allah-lah segala apa yang ada di langit dan apa yang ada di bumi. Dan jika kamu melahirkan apa yang ada di dalam hatimu atau kamu menyembunyikannya, niscaya Allah akan membuat perhitungan dengan kamu tentang perbuatanmu itu. Maka Allah mengampuni siapa yang dikehendaki-Nya dan menyiksa siapa yang dikehendaki-Nya; dan Allah Maha Kuasa atas segala sesuatu."
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 285"
                                    repeat={1}
                                    arabicText="ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيۡهِ مِن رَّبِّهِۦ وَٱلۡمُؤۡمِنُونَۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيۡنَ أَحَدٖ مِّن رُّسُلِهِۦۚ وَقَالُواْ سَمِعۡنَا وَأَطَعۡنَاۖ غُفۡرَانَكَ رَبَّنَا وَإِلَيۡكَ ٱلۡمَصِيرُ"
                                    translation='Rasul telah beriman kepada Al Quran yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang yang beriman. Semuanya beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya dan rasul-rasul-Nya. (Mereka mengatakan): "Kami tidak membeda-bedakan antara seseorang pun (dengan yang lain) dari rasul rasul-Nya", dan mereka mengatakan: "Kami dengar dan kami taat". (Mereka berdoa):"Ampunilah kami ya Tuhan kami dan kepada Engkaulah tempat kembali.'
                                />
                                <AyatCard
                                    title="Al-Baqarah Ayat 286"
                                    repeat={1}
                                    arabicText="لَا يُكَلِّفُ ٱللَّهُ نَفۡسًا إِلَّا وُسۡعَهَاۚ لَهَا مَا كَسَبَتۡ وَعَلَيۡهَا مَا ٱكۡتَسَبَتۡۗ رَبَّنَا لَا تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَاۚ رَبَّنَا وَلَا تَحۡمِلۡ عَلَيۡنَآ إِصۡرٗا كَمَا حَمَلۡتَهُۥ عَلَى ٱلَّذِينَ مِن قَبۡلِنَاۚ رَبَّنَا وَلَا تُحَمِّلۡنَا مَا لَا طَاقَةَ لَنَا بِهِۦۖ وَٱعۡفُ عَنَّا وَٱغۡفِرۡ لَنَا وَٱرۡحَمۡنَآۚ أَنتَ مَوۡلَىٰنَا فَٱنصُرۡنَا عَلَى ٱلۡقَوۡمِ ٱلۡكَٰفِرِينَ"
                                    translation='Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. Ia mendapat pahala (dari kebajikan) yang diusahakannya dan ia mendapat siksa (dari kejahatan) yang dikerjakannya. (Mereka berdo`a): "Ya Tuhan kami, janganlah Engkau hukum kami jika kami lupa atau kami tersalah. Ya Tuhan kami, janganlah Engkau bebankan kepada kami beban yang berat sebagaimana Engkau bebankan kepada orang-orang yang sebelum kami. Ya Tuhan kami, janganlah Engkau pikulkan kepada kami apa yang tak sanggup kami memikulnya. Beri maaflah kami; ampunilah kami; dan rahmatilah kami. Engkaulah Penolong kami, maka tolonglah kami terhadap kaum yang kafir".'
                                />
                                <AyatCard
                                    title="Ali Imran"
                                    repeat={1}
                                    arabicText="بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
                                    translation="Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang."
                                    centered
                                />
                                <AyatCard
                                    title="Ali Imran Ayat 1"
                                    repeat={1}
                                    arabicText="الٓمٓ"
                                    translation="Alif Lam Mim."
                                />
                                <AyatCard
                                    title="Ali Imran Ayat 2"
                                    repeat={1}
                                    arabicText="ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُ"
                                    translation="Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia. Yang Hidup kekal lagi terus menerus mengurus makhluk-Nya."
                                />
                                <AyatCard
                                    title="Thoha Ayat 111"
                                    repeat={1}
                                    arabicText="وَعَنَتِ ٱلۡوُجُوهُ لِلۡحَيِّ ٱلۡقَيُّومِۖ وَقَدۡ خَابَ مَنۡ حَمَلَ ظُلۡمٗا"
                                    translation="Dan tunduklah semua muka (dengan berendah diri) kepada Tuhan Yang Hidup Kekal lagi senantiasa mengurus (makhluk-Nya). Dan sesungguhnya telah merugilah orang yang melakukan kelaliman."
                                />
                                <AyatCard
                                    title="Thoha Ayat 112"
                                    repeat={1}
                                    arabicText="وَمَن يَعۡمَلۡ مِنَ ٱلصَّٰلِحَٰتِ وَهُوَ مُؤۡمِنٞ فَلَا يَخَافُ ظُلۡمٗا وَلَا هَضۡمٗا"
                                    translation="Dan barang siapa mengerjakan amal-amal yang saleh dan ia dalam keadaan beriman, maka ia tidak khawatir akan perlakuan yang tidak adil (terhadapnya) dan tidak (pula) akan pengurangan haknya."
                                />
                                <AyatCard
                                    title="At-Taubah Ayat 129"
                                    repeat={7}
                                    arabicText="حَسۡبِيَ ٱللَّهُ لَآإِلَٰهَ إِلَّاهُوَۖ عَلَيۡهِ تَوَكَّلۡتُۖ وَهُوَ رَبُّ ٱلۡعَرۡشِ ٱلۡعَظِيمِ"
                                    translation='"Cukuplah Allah bagiku; tidak ada Tuhanselain Dia. Hanya kepada-Nya aku bertawakal dan Dia adalah Tuhan yang memiliki Arasy yang agung".'
                                />
                                <AyatCard
                                    title="Al-Isra Ayat 110"
                                    repeat={1}
                                    arabicText="قُلِ ٱدۡعُواْ ٱللَّهَ أَوِ ٱدۡعُواْ ٱلرَّحۡمَٰنَۖ أَيّٗا مَّا تَدۡعُواْ فَلَهُ ٱلۡأَسۡمَآءُ ٱلۡحُسۡنَىٰۚ وَلَاتَجۡهَرۡ بِصَلَاتِكَ وَلَا تُخَافِتۡ بِهَا وَٱبۡتَغِ بَيۡنَ ذَٰلِكَ سَبِيلٗا"
                                    translation='Katakanlah: "Serulah Allah atau serulahAr-Rahman. Dengan nama yang mana saja kamu seru, Diamempunyai al asmaaulhusna (nama-nama yang terbaik)dan janganlah kamu mengeraskan suaramu dalam salatmudan janganlah pula merendahkannya dan carilah jalantengah di antara kedua itu".'
                                />
                                <AyatCard
                                    title="Al-Isra Ayat 111"
                                    repeat={1}
                                    arabicText="وَقُلِ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِي لَمۡ يَتَّخِذۡ وَلَدٗا وَلَمۡ يَكُن لَّهُۥ شَرِيكٞ فِي ٱلۡمُلۡكِ وَلَمۡ يَكُن لَّهُۥ وَلِيّٞ مِّنَ ٱلذُّلِّۖ وَكَبِّرۡهُ تَكۡبِيرَۢا"
                                    translation='Dan katakanlah: "Segala puji bagi AllahYang tidak mempunyai anak dan tidak mempunyai sekutudalam kerajaan-Nya dan Dia bukan pula hina yangmemerlukan penolong dan agungkanlah Dia denganpengagungan yang sebesar-besarnya.'
                                />
                                <AyatCard
                                    title="Al-Mu'minun Ayat 115"
                                    repeat={1}
                                    arabicText='أَفَحَسِبۡتُمۡ أَنَّمَا خَلَقۡنَٰكُمۡ عَبَثٗا وَأَنَّكُمۡ إِلَيۡنَا لَا تُرۡجَعُونَ'
                                    translation='Maka apakah kamu mengira, bahwa sesungguhnya Kami menciptakan kamu secara main-main (saja), dan bahwa kamu tidak akan dikembalikan kepada Kami?.'
                                />
                                <AyatCard
                                    title="Al-Mu'minun Ayat 116"
                                    repeat={1}
                                    arabicText='فَتَعَٰلَى ٱللَّهُ ٱلۡمَلِكُ ٱلۡحَقُّۖ لَآ إِلَٰهَ إِلَّا هُوَ رَبُّ ٱلۡعَرۡشِ ٱلۡكَرِيمِ'
                                    translation='Maka Maha Tinggi Allah, Raja Yang Sebenarnya; tidak ada Tuhan (yang berhak disembah) selain Dia, Tuhan (Yang mempunyai) Arasy yang mulia.'
                                />
                                <AyatCard
                                    title="Al-Mu'minun Ayat 117"
                                    repeat={1}
                                    arabicText='وَمَن يَدۡعُ مَعَ ٱللَّهِ إِلَٰهًا ءَاخَرَلَابُرۡهَٰنَ لَهُۥ بِهِۦ فَإِنَّمَا حِسَابُهُۥ عِندَ رَبِّهِۦٓۚ إِنَّهُۥلَايُفۡلِحُ ٱلۡكَٰفِرُونَ'
                                    translation='Dan barang siapa menyembah tuhan yang lain di samping Allah, padahal tidak ada suatu dalil pun baginya tentang itu, maka sesungguhnya perhitungannya di sisi Tuhannya. Sesungguhnya orang-orang yang kafir itu tiada beruntung.'
                                />
                                <AyatCard
                                    title="Al-Mu'minun Ayat 116"
                                    repeat={1}
                                    arabicText='وَقُل رَّبِّ ٱغۡفِرۡ وَٱرۡحَمۡ وَأَنتَ خَيۡرُ ٱلرَّٰحِمِينَ'
                                    translation='Dan katakanlah: "Ya Tuhanku berilah ampun dan berilah rahmat, dan Engkau adalah Pemberi rahmat Yang Paling baik.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 17"
                                    repeat={1}
                                    arabicText='فَسُبۡحَٰنَ ٱللَّهِ حِينَ تُمۡسُونَ وَحِينَ تُصۡبِحُونَ'
                                    translation='Maka bertasbihlah kepada Allah di waktu kamu berada di petang hari dan waktu kamu berada di waktu subuh.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 18"
                                    repeat={1}
                                    arabicText='وَلَهُ ٱلۡحَمۡدُ فِي ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِ وَعَشِيّٗا وَحِينَ تُظۡهِرُونَ'
                                    translation='Dan bagi-Nya-lah segala puji di langit dan di bumi dan di waktu kamu berada pada petang hari dan di waktu kamu berada di waktu Zuhur.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 19"
                                    repeat={1}
                                    arabicText='يُخۡرِجُ ٱلۡحَيَّ مِنَ ٱلۡمَيِّتِ وَيُخۡرِجُ ٱلۡمَيِّتَ مِنَ ٱلۡحَيِّ وَيُحۡيِ ٱلۡأَرۡضَ بَعۡدَ مَوۡتِهَاۚ وَكَذَٰلِكَ تُخۡرَجُونَ'
                                    translation='Dia mengeluarkan yang hidup dari yang mati dan mengeluarkan yang mati dari yang hidup dan menghidupkan bumi sesudah matinya. Dan seperti itulah kamu akan dikeluarkan dari kubur.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 20"
                                    repeat={1}
                                    arabicText='وَمِنۡءَايَٰتِهِۦٓ أَنۡ خَلَقَكُم مِّن تُرَابٖ ثُمَّ إِذَآ أَنتُم بَشَرٞ تَنتَشِرُونَ'
                                    translation='Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan kamu dari tanah, kemudian tiba-tiba kamu menjadi manusia yang berkembang biak.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 21"
                                    repeat={1}
                                    arabicText='وَمِنۡ ءَايَٰتِهِۦٓ أَنۡ خَلَقَ لَكُم مِّنۡ أَنفُسِكُمۡ أَزۡوَٰجٗا لِّتَسۡكُنُوٓاْ إِلَيۡهَا وَجَعَلَ بَيۡنَكُم مَّوَدَّةٗ وَرَحۡمَةًۚ إِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ لِّقَوۡمٖ يَتَفَكَّرُونَ'
                                    translation='Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 22"
                                    repeat={1}
                                    arabicText='وَمِنۡ ءَايَٰتِهِۦ خَلۡقُ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِ وَٱخۡتِلَٰفُ أَلۡسِنَتِكُمۡ وَأَلۡوَٰنِكُمۡۚ إِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ لِّلۡعَٰلِمِينَ'
                                    translation='Dan di antara tanda-tanda kekuasaan-Nya ialah menciptakan langit dan bumi dan berlain-lainan bahasamu dan warna kulitmu. Sesungguhnya pada yang demikan itu benar-benar terdapat tanda-tanda bagi orang-orang yang mengetahui.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 23"
                                    repeat={1}
                                    arabicText='وَمِنۡ ءَايَٰتِهِۦ مَنَامُكُم بِٱلَّيۡلِ وَٱلنَّهَارِ وَٱبۡتِغَآؤُكُم مِّن فَضۡلِهِۦٓۚإِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ لِّقَوۡمٖ يَسۡمَعُونَ'
                                    translation='Dan di antara tanda-tanda kekuasaan-Nya ialah tidurmu di waktu malam dan siang hari dan usahamu mencari sebagian dari karunia-Nya. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang mendengarkan.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 24"
                                    repeat={1}
                                    arabicText='وَمِنۡءَايَٰتِهِۦ يُرِيكُمُ ٱلۡبَرۡقَ خَوۡفٗا وَطَمَعٗا وَيُنَزِّلُ مِنَ ٱلسَّمَآءِمَآءٗ فَيُحۡيِۦبِهِ ٱلۡأَرۡضَ بَعۡدَ مَوۡتِهَآۚ إِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ لِّقَوۡمٖ يَعۡقِلُونَ'
                                    translation='Dan di antara tanda-tanda kekuasaan-Nya, Dia memperlihatkan kepadamu kilat untuk menimbulkan ketakutan dan harapan, dan Dia menurunkan hujan dari langit, lalu menghidupkan bumi dengan air itu sesudah matinya. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang mempergunakan akalnya.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 25"
                                    repeat={1}
                                    arabicText='وَمِنۡ ءَايَٰتِهِۦٓأَن تَقُومَ ٱلسَّمَآءُ وَٱلۡأَرۡضُ بِأَمۡرِهِۦۚ ثُمَّ إِذَا دَعَاكُمۡ دَعۡوَةٗ مِّنَ ٱلۡأَرۡضِ إِذَآ أَنتُمۡ تَخۡرُجُونَ'
                                    translation='Dan di antara tanda-tanda kekuasaan-Nya ialah berdirinya langit dan bumi dengan iradat-Nya. Kemudian apabila Dia memanggil kamu sekali panggil dari bumi, seketika itu juga kamu keluar dari kubur.'
                                />
                                <AyatCard
                                    title="Ar-Rum Ayat 26"
                                    repeat={1}
                                    arabicText='وَلَهُۥ مَن فِي ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِۖ كُلّٞ لَّهُۥ قَٰنِتُونَ'
                                    translation='Dan kepunyaan-Nya-lah siapa saja yang ada di langit dan di bumi. Semuanya hanya kepada-Nya tunduk.'
                                />
                                <AyatCard
                                    title="Ghafir Ayat 1"
                                    repeat={1}
                                    arabicText='حمٓ'
                                    translation='Haa Miim.'
                                />
                                <AyatCard
                                    title="Ghafir Ayat 2"
                                    repeat={1}
                                    arabicText='تَنزِيلُ ٱلۡكِتَٰبِ مِنَ ٱللَّهِ ٱلۡعَزِيزِ ٱلۡعَلِيمِ'
                                    translation='Diturunkan Kitab ini (Al Quran) dari Allah Yang Maha Perkasa lagi Maha Mengetahui.'
                                />
                                <AyatCard
                                    title="Ghafir Ayat 3"
                                    repeat={1}
                                    arabicText='غَافِرِ ٱلذَّنۢبِ وَقَابِلِ ٱلتَّوۡبِ شَدِيدِ ٱلۡعِقَابِ ذِي ٱلطَّوۡلِۖ لَآ إِلَٰهَ إِلَّاهُوَۖ إِلَيۡهِ ٱلۡمَصِيرُ'
                                    translation='Yang Mengampuni dosa dan Menerima taubat lagi keras hukuman-Nya. Yang mempunyai karunia. Tiada Tuhan (yang berhak disembah) selain Dia. Hanya kepada-Nya-lah kembali (semua makhluk).'
                                />
                                <AyatCard
                                    title="Al-Hasyr Ayat 22"
                                    repeat={1}
                                    arabicText='هُوَ ٱللَّهُ ٱلَّذِي لَآ إِلَٰهَ إِلَّا هُوَۖ عَٰلِمُ ٱلۡغَيۡبِ وَٱلشَّهَٰدَةِۖ هُوَ ٱلرَّحۡمَٰنُ ٱلرَّحِيمُ'
                                    translation='Dialah Allah Yang tiada Tuhan selain Dia, Yang Mengetahui yang ghaib dan yang nyata, Dialah Yang Maha Pemurah lagi Maha Penyayang.'
                                />
                                <AyatCard
                                    title="Al-Hasyr Ayat 23"
                                    repeat={1}
                                    arabicText='هُوَ ٱللَّهُ ٱلَّذِي لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡمَلِكُ ٱلۡقُدُّوسُ ٱلسَّلَٰمُ ٱلۡمُؤۡمِنُ ٱلۡمُهَيۡمِنُ ٱلۡعَزِيزُ ٱلۡجَبَّارُ ٱلۡمُتَكَبِّرُۚ سُبۡحَٰنَ ٱللَّهِ عَمَّا يُشۡرِكُونَ'
                                    translation='Dialah Allah Yang tiada Tuhan selain Dia, Raja, Yang Maha Suci, Yang Maha Sejahtera, Yang Mengaruniakan Keamanan, Yang Maha Memelihara, Yang Maha Perkasa, Yang Maha Kuasa, Yang Memiliki segala Keagungan, Maha Suci Allah dari apa yang mereka persekutukan.'
                                />
                                <AyatCard
                                    title="Al-Hasyr Ayat 24"
                                    repeat={1}
                                    arabicText='هُوَ ٱللَّهُ ٱلۡخَٰلِقُ ٱلۡبَارِئُ ٱلۡمُصَوِّرُۖ لَهُ ٱلۡأَسۡمَآءُ ٱلۡحُسۡنَىٰۚ يُسَبِّحُ لَهُۥ مَا فِي ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِۖ وَهُوَ ٱلۡعَزِيزُ ٱلۡحَكِيمُ'
                                    translation='Dialah Allah Yang Menciptakan, Yang Mengadakan, Yang Membentuk Rupa, Yang Mempunyai Asmaaul Husna. Bertasbih kepada-Nya apa yang di langit dan bumi. Dan Dialah Yang Maha Perkasa lagi Maha Bijaksana.'
                                />
                                <AyatCard
                                    title="Az-Zalzalah"
                                    repeat={1}
                                    arabicText='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
                                    translation='Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.'
                                    centered
                                />
                                <AyatCard
                                    title="Az-Zalzalah"
                                    repeat={1}
                                    arabicText='إِذَا زُلۡزِلَتِ ٱلۡأَرۡضُ زِلۡزَالَهَا ١ وَأَخۡرَجَتِ ٱلۡأَرۡضُ أَثۡقَالَهَا ٢ وَقَالَ ٱلۡإِنسَٰنُ مَا لَهَا ٣ يَوۡمَئِذٖ تُحَدِّثُ أَخۡبَارَهَا ٤ بِأَنَّ رَبَّكَ أَوۡحَىٰ لَهَا ٥ يَوۡمَئِذٖ يَصۡدُرُ ٱلنَّاسُ أَشۡتَاتٗا لِّيُرَوۡاْ أَعۡمَٰلَهُمۡ ٦ فَمَن يَعۡمَلۡ مِثۡقَالَ ذَرَّةٍ خَيۡرٗا يَرَهُۥ ٧ وَمَن يَعۡمَلۡ مِثۡقَالَ ذَرَّةٖ شَرّٗا يَرَهُۥ ٨'
                                    translation='Apabila bumi digoncangkan dengan goncangan (yang dahsyat) (1). dan bumi telah mengeluarkan beban-beban berat (yang dikandung)nya (2). dan manusia bertanya: "Mengapa bumi (menjadi begini)?" (3). Pada hari itu bumi menceritakan beritanya (4). karena sesungguhnya Tuhanmu telah memerintahkan (yang sedemikian itu) kepadanya (5). Pada hari itu manusia ke luar dari kuburnya dalam keadaan bermacam-macam, supaya diperlihatkan kepada mereka (balasan) pekerjaan mereka (6). Barangsiapa yang mengerjakan kebaikan seberat dzarrahpun, niscaya dia akan melihat (balasan)nya (7). Dan barangsiapa yang mengerjakan kejahatan sebesar dzarrahpun, niscaya dia akan melihat (balasan)nya pula (8).'
                                />
                                <AyatCard
                                    title="Al-Kafirun"
                                    repeat={1}
                                    arabicText='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
                                    translation='Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.'
                                    centered
                                />
                                <AyatCard
                                    title="Al-Kafirun"
                                    repeat={1}
                                    arabicText='قُلۡ يَٰٓأَيُّهَا ٱلۡكَٰفِرُونَ ١ لَآ أَعۡبُدُ مَا تَعۡبُدُونَ ٢ وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ ٣ وَلَآ أَنَا۠ عَابِدٞ مَّا عَبَدتُّمۡ ٤ وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ ٥ لَكُمۡ دِينُكُمۡ وَلِيَ دِينِ ٦'
                                    translation='Katakanlah: "Hai orang-orang kafir (1). Aku tidak akan menyembah apa yang kamu sembah (2). Dan kamu bukan penyembah Tuhan yang aku sembah (3). Dan aku tidak pernah menjadi penyembah apa yang kamu sembah (4). Dan kamu tidak pernah (pula) menjadi penyembah Tuhan yang aku sembah (5). Untukmu agamamu, dan untukkulah, agamaku" (6).'
                                />
                                <AyatCard
                                    title="An-Nashr"
                                    repeat={1}
                                    arabicText='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
                                    translation='Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.'
                                    centered
                                />
                                <AyatCard
                                    title="An-Nashr"
                                    repeat={1}
                                    arabicText='إِذَا جَآءَ نَصۡرُ ٱللَّهِ وَٱلۡفَتۡحُ ١ وَرَأَيۡتَ ٱلنَّاسَ يَدۡخُلُونَ فِي دِينِ ٱللَّهِ أَفۡوَاجٗا ٢ فَسَبِّحۡ بِحَمۡدِ رَبِّكَ وَٱسۡتَغۡفِرۡهُۚ إِنَّهُۥكَانَ تَوَّابَۢا ٣'
                                    translation='Apabila telah datang pertolongan Allah dan kemenangan (1). Dan kamu lihat manusia masuk agama Allah dengan berbondong-bondong (2). Maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampun kepada-Nya. Sesungguhnya Dia adalah Maha Penerima taubat (3).'
                                />
                                <AyatCard
                                    title="Al-Ikhlas"
                                    repeat={1}
                                    arabicText='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
                                    translation='Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.'
                                    centered
                                />
                                <AyatCard
                                    title="Al-Ikhlas"
                                    repeat={3}
                                    arabicText='قُلۡ هُوَ ٱللَّهُ أَحَدٌ ١ ٱللَّهُ ٱلصَّمَدُ ٢ لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ ٣ وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ ٤'
                                    translation='Katakanlah: "Dialah Allah, Yang Maha Esa (1). Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu (2). Dia tiada beranak dan tidak pula diperanakkan (3). Dan tidak ada seorangpun yang setara dengan Dia (4).'
                                />
                                <AyatCard
                                    title="Al-Falaq"
                                    repeat={1}
                                    arabicText='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
                                    translation='Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.'
                                    centered
                                />
                                <AyatCard
                                    title="Al-Falaq"
                                    repeat={3}
                                    arabicText='قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ ١ مِن شَرِّ مَا خَلَقَ ٢ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ٣ وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ ٤ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ٥'
                                    translation='Katakanlah: "Aku berlindung kepada Tuhan Yang Menguasai subuh, (1). Dari kejahatan makhluk-Nya (2). Dan dari kejahatan malam apabila telah gelap gulita (3). Dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul (4). Dan dari kejahatan pendengki bila ia dengki (5).'
                                />
                                <AyatCard
                                    title="An-Naas"
                                    repeat={1}
                                    arabicText='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
                                    translation='Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.'
                                    centered
                                />
                                <AyatCard
                                    title="An-Naas"
                                    repeat={3}
                                    arabicText='قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ ١ مَلِكِ ٱلنَّاسِ ٢ إِلَٰهِ ٱلنَّاسِ ٣ مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ ٤ ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ ٥ مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ ٦'
                                    translation='Katakanlah: Aku berlindung kepada Tuhan(yang memelihara dan menguasai) manusia (1). Raja manusia (2). Sembahan manusia (3). Dari kejahatan (bisikan) setan yang biasa bersembunyi (4). Yang membisikkan (kejahatan) ke dalam dada manusia (5). Dari (golongan) jin dan manusia (6).'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّهَِ وَالْحَمْدُ لِلّهَِ لاَ شَرِيكَ لَهُ ، لاَ إِلهَ إِلَّا هُوَ وَإِلَيْهِ الْمَصِيْرُ'
                                    translation='Kami bersore hari dan bersore hari pula kerajaan milik Allah. Segala puji bagi Allah, tiada sekutu bagi-Nya, tiada Tuhan melainkan Dia dan kepada-Nya tempat kembali.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='أَمْسَيْنَا عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى كَلِمَةِ اْلإِخْلاَصِ وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ'
                                    translation='Di waktu sore kami memegang agama Islam, kalimat ikhlas, agama Nabi kita Muhammad shallallahu ‘alaihi wa sallam, dan agama ayah kami Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اللَّهُمَّ إِنِّي أَمْسَيتُ مِنْكَ فِي نِعْمَةٍ وَعَافِيَةٍ وَسِتْر فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ وَسِتْرَكَ فِي الدُّنْيَا وَالآخِرَة'
                                    translation='Ya Allah, sesungguhnya aku bersore hari dari-Mu dalam kenikmatan, kesehatan dan perlindungan. Maka sempurnakannlah untukku kenikmatan, kesehatan dan perlindungan-Mu itu di dunia dan akhirat.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اللَّهُمَّ مَا أَمْسَ بِيْ مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيْكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ'
                                    translation='Ya Allah, kenikmatan yang aku atau salah seorang dari makhluk-Mu bersore hari dengannya adalah dari-Mu semata; tiada sekutu bagi-Mu. Maka bagi-Mu segala puji dan rasa syukur.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='يَا رَبِّي لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ وَلِعَظِيمِ سُلْطَانِكَ'
                                    translation='Ya Tuhanku, Segala puji bagiMu sebagaimana seyogyanya kemuliaan wajahMu dan keagungan kekuasaanMu.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولًا'
                                    translation='Aku ridha Allah sebagai Rabb, Islam sebagai agama, dan Muhammad sebagai Rasul.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ'
                                    translation='Maha Suci Allah dan Segala Puji bagiNya, sebanyak bilangan makhlukNya, seridha diriNya, setimbangan ‘arsy-Nya, dan sebanyak tinta dari kata-kataNya.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ'
                                    translation='Dengan nama Allah Yang bersama NamaNya sesuatu apa pun tidak akan celaka baik di bumi dan di langit. Dialah Maha Medengar lagi maha Mengetahui.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُه'
                                    translation='Ya Allah sesungguhnya kami berlindung kepadaMu dari menyekutukanMu dengan sesuatu yang kami ketahui, dan kami memohon ampunanMu dari apa-apa yang tidak kami ketahui.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ'
                                    translation='Aku berlindung dengan kalimat Allah yang sempurna dari keburukan apa-apa yang Dia ciptakan.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الهَمِّ وَالْحَزَنِ وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالبُخْلِ وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ'
                                    translation='Ya Allah, aku berlindung kepada-Mu dari rasa gelisah dan sedih, dari kelemahan dan kemalasan, dari sifat pengecut dan bakhil, dan dari lilitan hutang dan kesewenang-wenangan orang.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اَللَّهُمَّ عَافِنِي فِي بَدَنِي اَللَّهُمَّ عَافِنِي فِي سَمْعِي اَللَّهُمَّ عَافِنِي فِي بَصَرِي'
                                    translation='Ya Allah berikanlah kesehatan bagi badanku, bagi pendengaranku, bagi penglihatanku.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِوَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِلاَ إِلهَ إِلاَّ أَنْتَ'
                                    translation='Ya Allah sungguh aku berlindung kepadaMu dari kekufuran dan kefaqiran, Ya Allah sungguh aku berlindung kepadaMu dari azab kubur, tidak ada Ilah kecuali Engkau.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اَللّهُمَّ أَنْتَ رَبِّي لَا إلهَ إِلاَّ أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ'
                                    translation='Ya Allah, Engkau Tuhanku, tiada Tuhan kecuali Engkau. Engkau ciptakan aku dan aku adalah hamba-Mu. Aku berada di atas janjiMu, semampuku. Aku berlindung kepadaMu dari keburukan perbuatanku. Aku mengakui banyaknya nikmat (yang Engkau anugerahkan) kepadaku dan aku mengakui dosa-dosaku, maka ampunilah aku. Karena sesungguhnya tiada yang mengampuni dosa-dosa melainkan Engkau.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إلهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ'
                                    translation='Aku memohon ampunan Allah Yang Tiada Tuhan melainkan Dia, Yang Maha Hidup dan Maha Mengurus (makhluk-Nya).'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={10}
                                    arabicText='اَللّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّــيْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا إِبْـرَاهِيْمَ وبَارِكْ عَـلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَــلَى آلِ سَيـِّدِنَا إِبْـرَاهِيْمَ فِي الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ'
                                    translation='Ya Allah berikanlah shalawat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Berikanlah barakah kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Di alam Engkaulah Yang Maha Terpuji lagi Maha Mulia.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={100}
                                    arabicText='سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ'
                                    translation='Maha Suci Allah, segala puji bagi Allah, tiada Tuhan melainkan Allah dan Allah Maha Besar.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={10}
                                    arabicText='لاَ إلهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ'
                                    translation='Tiada Tuhan melainkan Allah semata, yang tiada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia berkuasa ata segala sesuatu.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَّا إلهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ'
                                    translation='Maha suci Engkau ya Allah, dan segala puji bagi-Mu. Aku bersaksi bahwa tiada Tuhan melainkan Engkau, aku memohon ampunan dan bertaubat kepada-Mu.'
                                />
                                <AyatCard
                                    title="Do'a Al-Matsurat"
                                    repeat={3}
                                    arabicText='اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَرَسُوْلِكَ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ تَسْلِيْمًا عَدَدَ مَا أَحَاطَ بِهِ عِلْمُكَ وَخَطَّ بِهِ قَلَمُكَ وَأَحْصَاهُ كِتَابُكَ، وَارْضَ اللَّهُمَّ عَنْ سَادَاتِنَا أَبِيْ بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيْ، وَعَنِ الصَّحَابَةِ أَجْمَعِيْنَ، وَعَنِ التَّابِعِيْنَ وَتَابِعِيْهِمْ بِإِحْسَانٍ إِلَى يَوْمِ الدِّيْن سُبْحَانَ رَبِّك رَبِّ العِزَّةِ عَمَّا يَصِفُوْنَ، وَسَلَامٌ عَلَى المُرْسَلِيْنَ، وَالحَمْدُ لِلَّهِ رَبِّ العَالَمِيْنَ'
                                    translation='Ya Allah berikanlah shalawat kepada Nabi Muhammad; hamba-Mu, nabi-Mu, dan Rasul-Mu; Nabi yang ummi. Juga kepada keluarga dan para sahabatnya serta berilah keselamatan sebanyak yang terjangkau oleh ilmu-Mu yang tergores oleh pena-Mu, dan yang terangkum oleh kitab-Mu. Ridhailah ya Allah para pemimpin kami, Abu Bakar, Umar, Utsman, dan Ali, semua sahabat, semua tabi’in dan orang-orang yang mengikuti mereka sampai hari pembalasan. Maha suci Tuhanmu; Tuhan kemuliaan, dari apa-apa yang mereka sifatkan. Keselamatan semoga tercurah kepada para utusan dan segala puji bagi Allah, Tuhan semesta alam.'
                                />
                                <AyatCard
                                    title="Ali Imran Ayat 26"
                                    repeat={1}
                                    arabicText='قُلِ ٱللَّهُمَّ مَٰلِكَ ٱلۡمُلۡكِ تُؤۡتِي ٱلۡمُلۡكَ مَن تَشَآءُ وَتَنزِعُ ٱلۡمُلۡكَ مِمَّن تَشَآءُ وَتُعِزُّ مَن تَشَآءُ وَتُذِلُّ مَن تَشَآءُۖ بِيَدِكَ ٱلۡخَيۡرُۖ إِنَّكَ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٞ'
                                    translation='Katakanlah: "Wahai Tuhan Yang mempunyai kerajaan, Engkau berikan kerajaan kepada orang yang Engkau kehendaki dan Engkau cabut kerajaan dari orang yang Engkau kehendaki. Engkau muliakan orang yang Engkau kehendaki dan Engkau hinakan orang yang Engkau kehendaki. Di tangan Engkaulah segala kebajikan.Sesungguhnya Engkau Maha Kuasa atas segala sesuatu.'
                                />
                                <AyatCard
                                    title="Ali Imran Ayat 27"
                                    repeat={1}
                                    arabicText='تُولِجُ ٱلَّيۡلَ فِي ٱلنَّهَارِ وَتُولِجُ ٱلنَّهَارَ فِي ٱلَّيۡلِۖ وَتُخۡرِجُ ٱلۡحَيَّ مِنَ ٱلۡمَيِّتِ وَتُخۡرِجُ ٱلۡمَيِّتَ مِنَ ٱلۡحَيِّۖ وَتَرۡزُقُ مَن تَشَآءُ بِغَيۡرِ حِسَابٖ'
                                    translation=''
                                />
                                <AyatCard
                                    title="Do'a Robithoh"
                                    repeat={3}
                                    arabicText='اَللَّهُمَّ إِنَّ هَذَا إِقْبَالُ لَيْلِكَ وَإِدْبَارُ نَهَارِكَ وَأَصْوَاتُ دُعَاتِكَ فَاغْفِرْلِي'
                                    translation='Ya Allah, sesungguhnya ini adalah malam-Mu yang telah menjelang dan malam-Mu yang tengah berlalu serta suara-suara penyeru-Mu, maka ampunilah aku.'
                                />
                                <AyatCard
                                    title="Do'a Robithoh"
                                    repeat={3}
                                    arabicText='اَللّهُمَّ إِنَّكَ تَعْلَمُ أَنَّ هَذِهِ الْقُلُوْبَ، قَدِ اجْتَمَعَتْ عَلَى مَحَبَّتِكَ وَالْتَقَتْ عَلَى طَاعَتِكَ، وَتَوَحَّدَتْ عَلَى دَعْوَتِكَ وَتَعَاهَدَتْ عَلَى نُصْرَةِ شَرِيْعَتِكَ فَوَثِّقِ اللَّهُمَّ رَابِطَتَهَا، وَأَدِمْ وُدَّهَا، وَاهْدِهَا سُبُلَهَا وَامْلَأَهَا بِنُوْرِكَ الَّذِيْ لاَ يَخْبُوْا وَاشْرَحْ صُدُوْرَهَا بِفَيْضِ الْإِيْمَانِ بِكَ، وَجَمِيْلِ التَّوَكُّلِ عَلَيْكَ وَاَحْيِهَا بِمَعْرِفَتِكَ، وَأَمِتْهَا عَلَى الشَّهَادَةِ فِي سَبِيْلِكَ إِنَّكَ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيْرِ. اَللَّهُمَّ أَمِيْنَ. وَصَلِّ اللَّهُمَّ عَلَى سَيِّدَنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمَ.'
                                    translation='Ya Allah, sesungguhnya Engkau Maha Mengetahui bahawa hati-hati ini, telah berhimpun di atas dasar kecintaan terhadapmu, bertemu di atas ketaatan kepada-Mu dan bersatu bagi memikul beban dakwah-Mu, hati-hati ini telah mengikat persetiaan untuk menolong meninggikan syariat-Mu. Oleh itu, Ya Allah, Engkau perkukuhkan ikatannya dan Engkau kekalkan kemesraan hati-hati ini, tunjukilah hati-hati ini akan jalan yang sebenar,  serta penuhkanlah (piala) hati-hati ini dengan cahaya Rabbani-Mu yang tidak kunjung redup, lapangkanlah hati-hati dengan limpahan keimanan serta keindahan tawakkal kepada-Mu, hidup suburkanlah hati-hati ini dengan makrifat (pengenalan yang sebenarnya) tentang-Mu.  (Jika Engkau takdirkan kami mati) maka matikanlah hati-hati ini sebagai para syuhada dalam perjuangan agama-Mu. Sesungguhnya Engkau sebaik-baik pelindung dan sebaik-baik penolong.  Ya Allah perkenankanlah doa kami. Dan semoga shalawat serta salam selalu tercurah kepada Nabi Muhammad, keluarganya dan kepada semua sahabatnya.'
                                />
                            </div>

                            <div className="mt-8 flex justify-center gap-4">
                                <Button className="bg-secondary hover:bg-secondary/90">
                                    <Link href="/pagi-kubro" className="flex items-center">
                                        Al-Matsurat Pagi
                                        <ArrowRight className="ml-2 h-4 w-4" />
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
                                    Al-Matsurat Pagi
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <BackToTopButton />
            </main>
            <Footer />
        </div>
    );
}
