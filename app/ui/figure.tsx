export default function Figure({
  caption,
  children,
}: {
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6 flex flex-col items-center">
      {children}
      {caption && (
        <figcaption className="mt-2 text-xs italic text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
