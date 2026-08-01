import React from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Properti = { markdown: string };

export function IsiMarkdown({ markdown }: Properti) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2
            id={buatIdJudul(children)}
            className="mt-10 mb-4 scroll-mt-24 text-2xl font-black tracking-tight text-[#102A43]"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={buatIdJudul(children)}
            className="mt-8 mb-3 scroll-mt-24 text-xl font-black tracking-tight text-[#102A43]"
          >
            {children}
          </h3>
        ),
        p: ({ children }) => <p className="mt-5">{children}</p>,
        strong: ({ children }) => (
          <strong className="font-bold text-[#102A43]">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-8">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-4 border-[#087477] bg-[#E5F2EF] px-5 py-3 text-[#102A43] italic">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => {
          const tujuan = href ?? "#";
          const internal = tujuan.startsWith("/") || tujuan.startsWith("#");
          if (internal) {
            return (
              <Link
                href={tujuan}
                className="font-bold text-[#087477] underline decoration-[#087477]/40 underline-offset-2 hover:decoration-[#087477]"
              >
                {children}
              </Link>
            );
          }
          return (
            <a
              href={tujuan}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-bold text-[#087477] underline decoration-[#087477]/40 underline-offset-2 hover:decoration-[#087477]"
            >
              {children}
            </a>
          );
        },
        table: ({ children }) => (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#F5EDE1] text-[#102A43]">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="border border-[#DED3C2] px-3 py-2 font-black">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-[#DED3C2] px-3 py-2 align-top">
            {children}
          </td>
        ),
        hr: () => <hr className="mt-8 border-t border-[#DED3C2]" />,
      }}
    >
      {markdown}
    </Markdown>
  );
}

function buatIdJudul(anak: React.ReactNode): string {
  const teks = React.Children.toArray(anak)
    .map((bagian) => (typeof bagian === "string" ? bagian : ""))
    .join(" ");
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
