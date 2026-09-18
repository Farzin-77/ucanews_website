import { PortableText, type PortableTextBlock } from "next-sanity";

const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-neutral-900">
        {children}
      </h2>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-neutral-900">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold tracking-tight text-neutral-900">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 text-[1.05rem] leading-8 text-neutral-800">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-red-700 pl-4 text-[1.05rem] leading-8 text-neutral-700 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-5 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-neutral-800">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 text-[1.05rem] leading-8 text-neutral-800">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        className="font-medium text-red-700 underline decoration-red-200 underline-offset-2 hover:text-red-800"
      >
        {children}
      </a>
    ),
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
