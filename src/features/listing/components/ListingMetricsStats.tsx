"use client";

type Props = {
  initialViewCount: number;
  initialClickCount: number;
  locale: "ko" | "en";
};

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-3">
      <div className="text-[11px] font-medium text-neutral-500">{label}</div>
      <div className="mt-1 text-lg font-bold text-neutral-950">{value}</div>
    </div>
  );
}

export default function ListingMetricStats({
  initialViewCount,
  initialClickCount,
  locale,
}: Props) {
  return (
    <>
      <StatBox
        label={locale === "en" ? "Views" : "조회수"}
        value={initialViewCount.toLocaleString()}
      />

      <StatBox
        label={locale === "en" ? "Clicks" : "클릭수"}
        value={initialClickCount.toLocaleString()}
      />
    </>
  );
}