"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/base/Container";
import { Card, CardContent } from "@/components/base/Card";

type Revenue = {
  one_time_revenue: number;
  mrr: number;
  total_monthly_value: number;
  currency: string;
};

export default function RevenuePage() {
  const [data, setData] = useState<Revenue | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchRevenue() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/revenue", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Revenue API failed: ${res.status}`);
      }

      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <div className="bg-neutral-50 py-10">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Revenue Dashboard</h1>

          <button
            onClick={fetchRevenue}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-sm text-neutral-500">Loading...</div>
        ) : !data ? (
          <div className="text-sm text-red-500">Failed to load</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total Revenue"
              value={format(data.total_monthly_value)}
            />
            <StatCard
              title="One-time Revenue"
              value={format(data.one_time_revenue)}
            />
            <StatCard title="MRR" value={format(data.mrr)} />
          </div>
        )}
      </Container>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="text-sm text-neutral-500">{title}</div>
        <div className="mt-2 text-2xl font-bold text-neutral-900">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function format(v: number) {
  return `$${v.toLocaleString()}`;
}