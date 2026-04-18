export function ListingMetaRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <strong className="mr-2 text-neutral-900">{label}</strong>
      <span>{value}</span>
    </div>
  );
}