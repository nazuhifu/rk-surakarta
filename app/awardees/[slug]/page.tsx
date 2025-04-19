import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, GraduationCap, Quote, Star, User, Instagram } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Education {
    degree: string;
    institution: string;
    year: string;
    description?: string;
}

interface Experience {
    title: string;
    company: string;
    year: string;
    description?: string;
}

interface SocialMedia {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
}

interface Awardee {
    name: string;
    role?: string;
    program: string;
    year: string;
    image?: any;
    coverImage?: any;
    bio?: string;
    education?: Education[];
    experience?: Experience[];
    achievements?: string[];
    testimonial?: string;
    socialMedia?: SocialMedia;
    slug: string;
}

async function getAwardeeBySlug(slug: string): Promise<Awardee | null> {
    const query = `
    *[_type == "awardee" && slug.current == $slug][0]{
      name,
      role,
      program,
      year,
      image,
      coverImage,
      bio,
      education[]{degree, institution, year, description},
      experience[]{title, company, year, description},
      achievements,
      testimonial,
      socialMedia,
      "slug": slug.current
    }
  `;
    const params = { slug };
    try {
        const awardee = await client.fetch<Awardee>(query, params);
        return awardee;
    } catch (error) {
        console.error("Error fetching awardee:", error);
        return null;
    }
}

// Define the dynamic route parameter type
interface Props {
    params: {
        slug: string;
    };
}

// Make the component async to fetch data server-side
export default async function AwardeeProfile({ params }: Props) {
    const awardee = await getAwardeeBySlug(params.slug);

    if (!awardee) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="my-10 flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Data tidak tersedia</h1>
                        <p className="text-muted-foreground mb-6">Awardee yang kamu cari tidak ditemukan.</p>
                        <Button asChild>
                            <Link href="/awardees">Kembali</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px]">
                    <div className="absolute inset-0">
                        <Image
                            src={awardee.coverImage ? urlFor(awardee.coverImage).url() : "/placeholder.svg?height=1200&width=1600"}
                            alt={`${awardee.name} cover image`}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                    <div className="container relative h-full flex flex-col justify-end pb-12 z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                                <Image src={awardee.image ? urlFor(awardee.image).url() : "/placeholder.svg?height=400&width=400"} alt={awardee.name} fill className="object-cover" />
                            </div>
                            <div className="text-white">
                                <div className="inline-block px-3 py-1 rounded-full bg-secondary text-white text-sm font-medium mb-2">{awardee.year} Awardee</div>
                                <h1 className="text-3xl md:text-4xl font-bold">{awardee.name}</h1>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                                    <div className="flex items-center">
                                        <GraduationCap className="h-4 w-4 mr-1" />
                                        <span className="text-white/90">{awardee.program}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-10">
                                {/* Biography */}
                                {awardee.bio && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Biografi</h2>
                                        <p className="text-muted-foreground">{awardee.bio}</p>
                                    </div>
                                )}

                                {/* Education */}
                                {awardee.education && awardee.education.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Pendidikan</h2>
                                        <div className="space-y-6">
                                            {awardee.education.map((edu, index) => (
                                                <div key={index} className="relative pl-8 pb-6 border-l border-gray-200 dark:border-gray-700">
                                                    <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                                                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                                                        <span className="text-sm text-muted-foreground">{edu.year}</span>
                                                    </div>
                                                    <div className="text-primary font-medium mb-2">{edu.institution}</div>
                                                    <p className="text-muted-foreground">{edu.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Experience */}
                                {awardee.experience && awardee.experience.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Pengalaman</h2>
                                        <div className="space-y-6">
                                            {awardee.experience.map((exp, index) => (
                                                <div key={index} className="relative pl-8 pb-6 border-l border-gray-200 dark:border-gray-700">
                                                    <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-secondary"></div>
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                                                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                                                        <span className="text-sm text-muted-foreground">{exp.year}</span>
                                                    </div>
                                                    <div className="text-primary font-medium mb-2">{exp.company}</div>
                                                    <p className="text-muted-foreground">{exp.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Achievements */}
                                {awardee.achievements && awardee.achievements.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Pencapaian</h2>
                                        <ul className="space-y-3">
                                            {awardee.achievements.map((achievement, index) => (
                                                <li key={index} className="flex items-start">
                                                    <Star className="h-5 w-5 text-secondary mr-2 mt-0.5 shrink-0" />
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Testimonial */}
                                {awardee.testimonial && (
                                    <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-xl">
                                        <div className="flex items-center mb-4">
                                            <Quote className="h-8 w-8 text-primary mr-2" />
                                            <h2 className="text-2xl font-bold"></h2>
                                        </div>
                                        <blockquote className="text-lg italic text-muted-foreground mb-4">{awardee.testimonial}</blockquote>
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{awardee.name}</div>
                                                <div className="text-sm text-muted-foreground">Awardee RK {awardee.year}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                {/* Quick Info Card */}
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <h3 className="font-semibold text-lg mb-4">Informasi Singkat</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                                <GraduationCap className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-muted-foreground">Program</div>
                                                <div className="font-medium">{awardee.program}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                                <Calendar className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-muted-foreground">Angkatan di RK</div>
                                                <div className="font-medium">{awardee.year}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Connect */}
                                {awardee.socialMedia && (
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                        <h3 className="font-semibold text-lg mb-4">Media Sosial</h3>
                                        <div className="space-y-3">
                                            {awardee.socialMedia.instagram && (
                                                <Button asChild variant="outline" className="w-full justify-start">
                                                    <Link href={awardee.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                                                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>
                                                        Instagram
                                                    </Link>
                                                </Button>
                                            )}
                                            {awardee.socialMedia.linkedin && (
                                                <Button asChild variant="outline" className="w-full justify-start">
                                                    <Link href={awardee.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
                                                        LinkedIn
                                                    </Link>
                                                </Button>
                                            )}
                                            {awardee.socialMedia.twitter && (
                                                <Button asChild variant="outline" className="w-full justify-start">
                                                    <Link href={awardee.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                                                        Twitter
                                                    </Link>
                                                </Button>
                                            )}
                                            {awardee.socialMedia.github && (
                                                <Button asChild variant="outline" className="w-full justify-start">
                                                    <Link href={awardee.socialMedia.github} target="_blank" rel="noopener noreferrer">
                                                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                                        Github
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation */}
                <section className="py-8 border-t">
                    <div className="container">
                        <Button asChild variant="outline">
                            <Link href="/awardees">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

interface RelatedAwardeeCardProps {
    name?: string | null;
    university?: string | null;
    program?: string | null;
    year?: string | null;
    image: string;
    slug?: string;
}