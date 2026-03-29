import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import {remark} from 'remark';
import {visit} from 'unist-util-visit';
import Toc from '@/app/ui/toc';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`@/app/markdown/blog-posts/${slug}.mdx`)
  const headings = getHeadings(slug);
  const metadata = getMetadata(slug);
 
  return (
    <div className="flex gap-8">
      <div className="w-3/4">
        <h1>
          {metadata.title}
        </h1>
        <h2>
          {metadata.date}
        </h2>
        <Post />
      </div>
      <div className="w-1/4 shrink-0 sticky top-6 self-start">
        <Toc headings={headings} />
      </div>
    </div>
  )
};

/**
 * Returns the metadata from the mdx file associated with the given slug.  
 */
function getMetadata(slug: string) {
  const raw = fs.readFileSync(
    path.join(process.cwd(), `app/markdown/blog-posts/${slug}.mdx`),
    'utf-8'
  )

  const { data } = matter(raw);
  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
  };
}

/**
 * Retrieves the headings from the mdx file associated with the given slug.
 */
function getHeadings(slug: string) {
  // Use Github slugger because rehype-slug uses the same package.
  // This ensures that slugs generated here match in the rendered mdx.
  const slugger = new GithubSlugger()
  const raw = fs.readFileSync(
    path.join(process.cwd(), `app/markdown/blog-posts/${slug}.mdx`),
    'utf-8'
  )

  const { content } = matter(raw)
  const tree = remark().parse(content)
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
