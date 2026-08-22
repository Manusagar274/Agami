import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

type EnquiryButtonProps = {
  productName?: string;
  sku?: string | null;
  productUrl?: string | null;
  label?: string;
  className?: string;
  variant?: "solid" | "outline" | "text";
  size?: "sm" | "md" | "lg";
};

/**
 * The site's primary conversion action: "Enquire on WhatsApp".
 * Builds the pre-filled enquiry message from product context when given,
 * otherwise falls back to a general enquiry.
 */
export function EnquiryButton({
  productName,
  sku,
  productUrl,
  label = "Enquire on WhatsApp",
  className,
  variant,
  size,
}: EnquiryButtonProps) {
  const href = productName
    ? generateWhatsAppUrl({ productName, sku, productUrl })
    : generateWhatsAppUrl(
        "Hi Haritha, I'd love to know more about your jewellery collection. Could you help me?"
      );

  return (
    <WhatsAppButton href={href} className={className} variant={variant} size={size}>
      {label}
    </WhatsAppButton>
  );
}
