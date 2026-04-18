export function AdBanner({ title }: { title: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="text-lg font-semibold">{title}</div>
    </div>
  );
}