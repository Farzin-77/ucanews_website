import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "campus",
      title: "Campus",
      type: "string",
      options: {
        list: [
          { title: "Khorog", value: "Khorog" },
          { title: "Naryn", value: "Naryn" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short preview text shown on article cards.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      campus: "campus",
      date: "date",
      media: "coverImage",
    },
    prepare({ title, campus, date, media }) {
      return {
        title,
        subtitle: [campus, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
