export default function OrdersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-32 bg-stone-200 rounded-xl" />
        <div className="h-4 w-56 bg-stone-200 rounded mt-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-stone-100 p-4 space-y-3">
            <div className="h-5 w-20 bg-stone-200 rounded" />
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="bg-white rounded-xl p-4 space-y-2">
                <div className="h-4 w-24 bg-stone-200 rounded" />
                <div className="h-3 w-full bg-stone-200 rounded" />
                <div className="h-3 w-16 bg-stone-200 rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
