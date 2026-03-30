import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Bio from '@/app/markdown/bio.mdx';
import Post from './ui/post';

export default function Home() {
  const dir = path.join(process.cwd(), 'app/markdown/blog-posts');
  const files = fs.readdirSync(dir);

  const posts = files
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data } = matter(raw);
      return {
        slug: data.slug,
        title: data.title,
        date: data.date,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className="flex gap-8"> 
        <div className="w-3/4">
          <Bio />
        </div>
        <div className="w-1/4"></div>
      </div>
      <h1 className="my-2 text-3xl font-bold">
        Posts
      </h1>
      <div>
        <ul className="space-y-1">
          {posts.map(post => (
            <Post key={post.slug} slug={post.slug} title={post.title} date={post.date} />
          ))}
        </ul>
      </div>
    </>
  );
}
