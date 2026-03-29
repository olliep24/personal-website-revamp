import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import {remark} from 'remark';
import {visit} from 'unist-util-visit';

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

export function getHeadings(slug: string) {
  const slugger = new GithubSlugger()
  const raw = fs.readFileSync(
    path.join(process.cwd(), `app/markdown/blog-posts/${slug}.mdx`),
    'utf-8'
  )

  const tree = remark().parse(raw)
  const headings: { text: string; slug: string; depth: number }[] = []

  visit(tree, 'heading', (node: any) => {
    const text = node.children.map((c: any) => c.value).join('')
    headings.push({
      text,
      depth: node.depth,
      slug: slugger.slug(text),
    })
  })

  return headings
};
