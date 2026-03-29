import Link from "next/link";

interface PostProps {
  slug: string;
  title: string;
  date: string;
}

export default function Post({ slug, title, date }: PostProps) {
  return (
    <div
      className="flex items-baseline gap-3 py-2"
    >
      <span className="w-28 shrink-0 text-sm text-zinc-400">{date}</span>
      <Link
        href={`/blog/${slug}`}
      >
        <span className="text-zinc-800">{title}</span>
      </Link>
    </div>
  );
}