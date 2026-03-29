import Link from "next/link";

interface PostProps {
  slug: string;
  title: string;
  date: string;
}

export default function Post({ slug, title, date }: PostProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex items-baseline gap-3 py-3 transition-opacity hover:opacity-60"
    >
      <span className="w-28 shrink-0 text-sm text-zinc-400">{date}</span>
      <span className="text-zinc-800 group-hover:underline">{title}</span>
    </Link>
  );
}