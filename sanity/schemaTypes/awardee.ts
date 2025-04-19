export default {
    name: "awardee",
    title: "Awardee",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Full Name",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            description: "Digunakan untuk URL halaman awardee.",
        },
        {
            name: "role",
            title: "Role",
            type: "string",
        },
        {
            name: "program",
            title: "Program of Study",
            type: "string",
        },
        {
            name: "year",
            title: "Year",
            type: "string",
        },
        {
            name: "image",
            title: "Profile Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "bio",
            title: "Biography",
            type: "text",
        },
        {
            name: "education",
            title: "Education",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "degree", title: "Degree", type: "string" },
                        { name: "institution", title: "Institution", type: "string" },
                        { name: "year", title: "Year", type: "string" },
                        { name: "description", title: "Description", type: "text" },
                    ],
                },
            ],
        },
        {
            name: "experience",
            title: "Experience",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Title", type: "string" },
                        { name: "company", title: "Company", type: "string" },
                        { name: "year", title: "Year", type: "string" },
                        { name: "description", title: "Description", type: "text" },
                    ],
                },
            ],
        },
        {
            name: "achievements",
            title: "Achievements",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "testimonial",
            title: "Testimonial",
            type: "text",
        },
        {
            name: "socialMedia",
            title: "Social Media",
            type: "object",
            fields: [
                { name: "linkedin", title: "LinkedIn", type: "url" },
                { name: "twitter", title: "Twitter", type: "url" },
                { name: "github", title: "GitHub", type: "url" },
                { name: "instagram", title: "Instagram", type: "url" },
            ],
        },
    ],
};
