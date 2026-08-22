export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-3 w-72 bg-sand/40 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-square bg-sand/30" />
        <div className="flex flex-col gap-4">
          <div className="h-3 w-24 bg-sand/30" />
          <div className="h-10 w-3/4 bg-sand/30" />
          <div className="h-6 w-1/3 bg-sand/30" />
          <div className="h-24 w-full bg-sand/20" />
        </div>
      </div>
    </div>
  );
}
