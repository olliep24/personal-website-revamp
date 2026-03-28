import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Bio from '@/app/markdown/bio.mdx';

export default function Home() {
  const files = fs.readdirSync(path.join(process.cwd(), 'app/markdown/blog-posts'));
  const posts = files.map(f => f.replace('.mdx', ''));

  return (
    <>
      <Bio />
      <div className="mx-auto max-w-3xl px-6 py-12 font-sans">
        <ul className="space-y-3">
          {posts.map(slug => (
            <li key={slug}>
              <Link
                href={`/blog/${slug}`}
                className="text-zinc-700 transition-colors hover:text-zinc-900"
              >
                {slug.charAt(0).toUpperCase() + slug.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
