export default function References({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 border-t border-zinc-200 pt-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
        References
      </p>
      <div className="space-y-2 text-sm text-zinc-500 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-zinc-600">
        {children}
      </div>
    </div>
  );
}
