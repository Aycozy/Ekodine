"use client";

import { AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-heading font-bold text-stone-900">Something went wrong</h2>
      <p className="text-stone-500 mt-2 max-w-md">
        An unexpected error occurred. Please try again or contact support if the problem persists.
      </p>
      <button
        onClick={reset}
        className="mt-6 px-6 py-2.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
