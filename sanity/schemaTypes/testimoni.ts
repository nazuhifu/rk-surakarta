import { defineType } from "sanity";

export default defineType({
    name: "testimoni",
    title: "Testimoni",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Nama",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "role",
            title: "Jabatan/Profesi",
            type: "string",
        },
        {
            name: "quote",
            title: "Kutipan",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required(),
        },
        {
            name: "image",
            title: "Foto",
            type: "image",
            options: {
                hotspot: true,
            },
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "role",
            media: "image",
        },
    },
});
