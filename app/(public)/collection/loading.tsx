export default function CollectionLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-3 w-40 bg-sand/40 mb-8" />
      <div className="h-10 w-64 bg-sand/40 mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-[4/5] bg-sand/30" />
            <div className="h-3 w-1/2 bg-sand/30" />
            <div className="h-4 w-3/4 bg-sand/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
