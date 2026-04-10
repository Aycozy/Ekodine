export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-stone-200 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border p-6 space-y-3">
            <div className="h-4 w-24 bg-stone-200 rounded" />
            <div className="h-8 w-20 bg-stone-200 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border p-6 h-80" />
        <div className="bg-white rounded-xl border p-6 h-80" />
      </div>
    </div>
  );
}
