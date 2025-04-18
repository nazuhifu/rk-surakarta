export default {
    name: "heroSlideshow",
    type: "document",
    title: "Hero Slideshow",
    fields: [
        {
            name: "images",
            type: "array",
            title: "Gambar Slideshow",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alternative text",
                            description: "Penting untuk SEO dan aksesibilitas.",
                        },
                    ],
                },
            ],
        },
    ],
};
