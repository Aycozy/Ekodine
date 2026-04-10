export default function ReservationsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between">
        <div>
          <div className="h-8 w-44 bg-stone-200 rounded-xl" />
          <div className="h-4 w-56 bg-stone-200 rounded mt-2" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-stone-200 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 w-20 bg-stone-200 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border p-5 space-y-3">
            <div className="h-5 w-32 bg-stone-200 rounded" />
            <div className="h-4 w-48 bg-stone-200 rounded" />
            <div className="h-4 w-full bg-stone-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
