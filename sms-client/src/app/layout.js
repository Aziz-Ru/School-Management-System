import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "NHSH",
  description: "Namuri high School And College",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"font-sans"}>
        <Navbar />
        <Hero />

        {children}
        <Footer />
      </body>
    </html>
  );
}
