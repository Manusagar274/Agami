import type { Product } from "@/types/product";

type MetaRow = {
  label: string;
  value: string;
};

export function ProductMeta({ product }: { product: Product }) {
  const rows: MetaRow[] = [
    { label: "Product Code", value: product.sku },
    { label: "Material", value: product.material || "" },
    { label: "Finish", value: product.finish || "" },
    { label: "Colour", value: product.color || "" },
    { label: "Dimensions", value: product.dimensions || "" },
    { label: "Occasion", value: product.occasion || "" },
  ].filter((row) => row.value);

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-sand/60 pt-6">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-0.5">
          <dt className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-brown/55">{row.label}</dt>
          <dd className="font-serif text-sm text-brown">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
