import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`@/app/markdown/blog-posts/${slug}.mdx`)
 
  return <Post />
};
 
/**
 * Reads the markdown posts and adds them to the static params to create static routes. 
 */
export function generateStaticParams() {
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

  return posts.map(post => ({ slug: post.slug }))
};
 
export const dynamicParams = false;