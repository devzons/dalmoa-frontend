export async function trackClick(type: string, id?: number) {
  if (!id) return;

  try {
    await fetch("/api/track-click", {
      method: "POST",
      body: JSON.stringify({ type, id }),
    });
  } catch {
    // silent fail
  }
}