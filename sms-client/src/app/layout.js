import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Roboto } from "next/font/google";
import "./globals.css";
export const metadata = {
  title: "NHSH",
  description: "Namuri high School And College",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`"${roboto.className} site-bg site-txt"`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
