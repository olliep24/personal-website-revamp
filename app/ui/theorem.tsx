export default function Theorem({
  name,
  children,
}: {
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 border-l-4 border-zinc-400 bg-zinc-50 px-5 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        Theorem{name ? `: ${name}` : ""}
      </p>
      <div className="text-zinc-800">{children}</div>
    </div>
  );
}
