export default function SettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-32 bg-stone-200 rounded-xl" />
        <div className="h-4 w-56 bg-stone-200 rounded mt-2" />
      </div>
      <div className="flex gap-2 border-b pb-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 w-36 bg-stone-200 rounded-xl" />
        ))}
      </div>
      <div className="bg-white rounded-xl border p-6 space-y-5 max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-stone-200 rounded-2xl" />
          <div className="h-10 w-36 bg-stone-200 rounded-xl" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-4 w-24 bg-stone-200 rounded" />
            <div className="h-12 w-full bg-stone-200 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
