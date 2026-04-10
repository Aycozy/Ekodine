"use client";

import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-heading font-bold text-stone-900">Something went wrong</h2>
      <p className="text-stone-500 mt-2 max-w-md text-sm">
        We couldn&apos;t load this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-4 px-5 py-2 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        Try Again
      </button>
    </div>
  );
}
