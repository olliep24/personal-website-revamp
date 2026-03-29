interface TocParams {
  headings: {
    text: string;
    slug: string;
    depth: number
  }[]
};

const depthPadding: Record<number, string> = {
  1: 'pl-0',
  2: 'pl-3',
  3: 'pl-6',
  4: 'pl-9',
  5: 'pl-12',
  6: 'pl-14',
};

export default function Toc({ headings }: TocParams) {
  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {headings.map((heading) => (
          <li key={heading.slug} className={depthPadding[heading.depth] ?? 'pl-0'}>
            <a
              href={`#${heading.slug}`}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-800"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
