"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={clsx("fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-opacity duration-300", "bg-primary text-white hover:bg-primary/90", visible ? "opacity-100" : "opacity-0 pointer-events-none")}
            aria-label="Back to top"
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
}
