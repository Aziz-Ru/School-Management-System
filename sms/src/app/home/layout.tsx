import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="">
      <div className="">
        <Hero />
      </div>
      <div className="overflow-auto">
        <section className="max-w-screen-xl mx-auto min-h-[50vh]">
          {children}
        </section>
        <Footer />
      </div>
    </div>
  );
}
