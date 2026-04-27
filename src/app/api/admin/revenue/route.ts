import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = String(process.env.NEXT_PUBLIC_API_URL || "")
    .replace(/\/wp-json\/?$/, "")
    .replace(/\/+$/, "");

  const url = `${baseUrl}/wp-json/dalmoa/v1/admin/revenue`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    return NextResponse.json(
      {
        error: "Failed to load revenue",
        status: res.status,
        url,
        body: text,
      },
      { status: res.status }
    );
  }

  return NextResponse.json(JSON.parse(text));
}