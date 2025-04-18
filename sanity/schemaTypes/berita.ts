export default {
    name: "berita",
    type: "document",
    title: "Berita",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Judul",
      },
      {
        name: "slug",
        type: "slug",
        title: "Slug",
        options: { source: "title", maxLength: 96 },
      },
      {
        name: "content",
        type: "array",
        title: "Isi Berita",
        of: [
          {
            type: "block",
            styles: [ 
              {title: 'Normal', value: 'normal'},
              {title: 'H2', value: 'h2'},
              {title: 'H3', value: 'h3'},
              {title: 'Quote', value: 'blockquote'},
            ],
            marks: { 
              decorators: [
                {title: 'Strong', value: 'strong'},
                {title: 'Emphasis', value: 'em'},
                {title: 'Underline', value: 'underline'},
                {title: 'Strike-through', value: 'strike-through'},
              ],
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    {
                      title: 'URL',
                      name: 'href',
                      type: 'url',
                    },
                  ],
                },
              ],
            },
          },
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
      {
        name: "image",
        type: "image",
        title: "Gambar Utama",
        options: {
          hotspot: true,
        },
      },
      {
        name: "publishedAt",
        type: "datetime",
        title: "Tanggal Publish",
      },
      {
        name: "category",
        type: "string",
        title: "Kategori",
        options: {
          list: [
            { title: "Kegiatan", value: "Kegiatan" },
            { title: "Kerjasama", value: "Kerjasama" },
            { title: "Pengumuman", value: "Pengumuman" },
            { title: "Komunitas", value: "Komunitas" },
          ],
          layout: "radio",
        },
      },
    ],
  };