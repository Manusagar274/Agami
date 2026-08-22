export function PullQuote({ children, attribution }: { children: string; attribution?: string }) {
  return (
    <figure className="mx-auto max-w-3xl py-10 text-center">
      <blockquote className="font-display italic text-3xl sm:text-4xl leading-snug text-olive">
        &ldquo;{children}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 font-sans text-xs tracking-[0.25em] uppercase text-terracotta">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
