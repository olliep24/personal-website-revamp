import fs from 'fs';
import path from 'path';

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
  const files = fs.readdirSync(path.join(process.cwd(), 'app/markdown/blog-posts'))
  return files.map(f => ({ slug: f.replace('.mdx', '') }))
};
 
export const dynamicParams = false;