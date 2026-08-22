import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/brand/GoldDivider";

export default function PublicNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="font-display italic text-2xl text-terracotta">404</span>
      <h1 className="font-display text-4xl text-olive">This piece isn&rsquo;t in our catalogue.</h1>
      <GoldDivider className="w-32" />
      <p className="font-serif text-brown/70 max-w-md">
        The page you&rsquo;re looking for may have been moved or is no longer available.
      </p>
      <div className="flex gap-4">
        <Button href="/collection">Browse Collection</Button>
        <Button href="/" variant="secondary">
          Back Home
        </Button>
      </div>
    </div>
  );
}
