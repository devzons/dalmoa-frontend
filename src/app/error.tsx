"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-semibold text-neutral-950">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}