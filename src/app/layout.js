import "./globals.css";
import Providers from "./providers";
import { Hind_Siliguri } from "next/font/google";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-siliguri",
});

export const metadata = {
  title: "My App",
  description: "Next.js App with Hind Siliguri font",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={hindSiliguri.variable}>
      <body className="bg-[#18304e] font-siliguri">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
