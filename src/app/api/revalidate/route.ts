import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = body?.secret;
    const tag = body?.tag;

    if (!process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { ok: false, message: "Missing revalidate secret" },
        { status: 500 }
      );
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { ok: false, message: "Invalid secret" },
        { status: 401 }
      );
    }

    if (!tag || typeof tag !== "string") {
      return NextResponse.json(
        { ok: false, message: "Missing tag" },
        { status: 400 }
      );
    }

    revalidateTag(tag);

    return NextResponse.json({
      ok: true,
      revalidated: true,
      tag,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}