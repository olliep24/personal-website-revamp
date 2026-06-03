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
        <div className="my-8">
          <h1 className="text-5xl font-bold">
            {metadata.title}
          </h1>
          <h2 className="text-gray-400">
            {metadata.date}
          </h2>
          {metadata.githubUrl && (
            <a
              href={metadata.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline mt-2 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Source
            </a>
          )}
          <hr className="my-2 border-gray-200" />
        </div>
        <article className="prose max-w-none">
          <Post />
        </article>
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
    githubUrl: data.githubUrl as string | undefined,
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
