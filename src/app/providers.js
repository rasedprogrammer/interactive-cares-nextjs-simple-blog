"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import Footer from "./Components/Footer";
import Navber from "./Components/Navber";

export default function Providers({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <HeroUIProvider>
      <SessionProvider>
        {!isAdminRoute && <Navber />}
        <main>{children}</main>
        {!isAdminRoute && <Footer />}
      </SessionProvider>
    </HeroUIProvider>
  );
}
