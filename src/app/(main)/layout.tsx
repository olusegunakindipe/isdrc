import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getSiteSettings } from "@/sanity/lib/fetch";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        siteName={settings?.shortName || "ISDRC"}
        logoUrl={settings?.logoUrl || "/images/logo.png"}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer
        shortName={settings?.shortName || "ISDRC"}
        fullName={settings?.fullName || ""}
        tagline={settings?.tagline || ""}
        description={settings?.description || ""}
        contactEmail={settings?.contactEmail || ""}
        logoUrl={settings?.logoUrl || "/images/logo.png"}
      />
    </div>
  );
}
