export default function StaffLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between">
        <div>
          <div className="h-8 w-24 bg-stone-200 rounded-xl" />
          <div className="h-4 w-40 bg-stone-200 rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-stone-200 rounded-xl" />
      </div>
      <div className="h-10 w-64 bg-stone-200 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-stone-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-stone-200 rounded" />
                <div className="h-4 w-44 bg-stone-200 rounded" />
                <div className="h-4 w-20 bg-stone-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
