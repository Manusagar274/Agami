import { siteConfig } from "@/lib/config/site";

export type WhatsAppEnquiryInput = {
  productName: string;
  sku?: string | null;
  productUrl?: string | null;
  /** Overrides the default templated message entirely, when provided. */
  message?: string;
};

/**
 * Builds a wa.me deep link with a pre-filled, URL-encoded enquiry message.
 * The destination number comes from NEXT_PUBLIC_WHATSAPP_NUMBER — never hard-code it.
 */
export function generateWhatsAppUrl(input: WhatsAppEnquiryInput | string): string {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");

  const message =
    typeof input === "string"
      ? input
      : input.message ??
        buildEnquiryMessage({
          productName: input.productName,
          sku: input.sku,
          productUrl: input.productUrl,
        });

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

function buildEnquiryMessage({
  productName,
  sku,
  productUrl,
}: {
  productName: string;
  sku?: string | null;
  productUrl?: string | null;
}) {
  const skuPart = sku ? ` (Product Code: ${sku})` : "";
  const linkPart = productUrl ? `\n${productUrl}` : "";
  return `Hi Haritha, I'm interested in the ${productName}${skuPart}. Could you please share more details and availability?${linkPart}`;
}

export function generateGeneralEnquiryUrl(message?: string): string {
  return generateWhatsAppUrl(
    message ??
      "Hi Haritha, I'd love to know more about your jewellery collection. Could you help me?"
  );
}
