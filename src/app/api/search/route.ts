import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const locale = req.nextUrl.searchParams.get("locale") || "ko";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(q)}&locale=${locale}`,
      {
        next: { revalidate: 30 }, // 캐싱 (중요)
      }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();

    return NextResponse.json({
      results: data.results ?? [],
    });
  } catch (e) {
    return NextResponse.json({ results: [] });
  }
}