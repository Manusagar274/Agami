import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EnquiryButton } from "@/components/whatsapp/EnquiryButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Persistent mobile enquiry CTA */}
      <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden">
        <EnquiryButton className="w-full shadow-lg" />
      </div>
    </>
  );
}
