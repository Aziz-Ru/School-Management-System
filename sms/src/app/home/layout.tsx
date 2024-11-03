import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col">
      <div className="">
        <Hero />
      </div>
      <div className="overflow-auto">
        <section className="">{children}</section>
        <Footer />
      </div>
    </div>
  );
}
