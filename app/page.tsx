import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Bio from '@/app/markdown/bio.mdx';

export default function Home() {
  const dir = path.join(process.cwd(), 'app/markdown/blog-posts');
  const files = fs.readdirSync(dir);

  const posts = files.map(f => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
    const { data } = matter(raw);
    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
    };
  });

  return (
    <>
      <Bio />
      <div className="mx-auto max-w-3xl px-6 py-12 font-sans">
        <ul className="space-y-3">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-zinc-700 transition-colors hover:text-zinc-900"
              >
                {post.title + post.date}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
