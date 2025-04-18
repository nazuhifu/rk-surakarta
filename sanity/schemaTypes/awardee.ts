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
    ],
};
