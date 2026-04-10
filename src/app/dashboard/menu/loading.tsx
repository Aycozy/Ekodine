export default function MenuLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between">
        <div>
          <div className="h-8 w-32 bg-stone-200 rounded-xl" />
          <div className="h-4 w-48 bg-stone-200 rounded mt-2" />
        </div>
        <div className="h-10 w-28 bg-stone-200 rounded-xl" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 w-20 bg-stone-200 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border overflow-hidden">
            <div className="h-40 bg-stone-200" />
            <div className="p-4 space-y-2">
              <div className="h-5 w-32 bg-stone-200 rounded" />
              <div className="h-3 w-20 bg-stone-200 rounded" />
              <div className="h-4 w-full bg-stone-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
