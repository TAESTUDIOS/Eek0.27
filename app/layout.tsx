// app/layout.tsx
// Root layout for the Personal Stability Assistant (PSA)
// Purpose: App shell with left sidebar navigation and main content area.

"use client";

import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import ThemeClient from "@/components/ThemeClient";
import MobileHamburger from "@/components/MobileHamburger";
import GestureGate from "@/components/security/GestureGate";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWidgetPage = pathname === "/widget";

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden antialiased bg-[var(--surface-0)] text-[var(--fg)]`}>
        <ThemeClient />
        {isWidgetPage ? (
          // Widget page bypasses GestureGate and has no sidebar/layout
          children
        ) : (
          <GestureGate>
            <div className="h-screen flex flex-col md:flex-row">
              {/* Sidebar (collapsible at small widths, expanded on md+) */}
              <aside className="hidden md:block w-64 border-r border-[var(--border)] bg-[var(--surface-1)]">
                <Sidebar />
              </aside>

              {/* Top nav removed; embedded in chat panel instead */}

              {/* Main content */}
              <main className="flex-1 min-w-0 flex overflow-hidden relative">
                {/* Global mobile hamburger (hidden on /chat via component) */}
                <MobileHamburger />
                <div className="mx-auto px-2 md:px-3 py-2 md:py-3 max-w-5xl flex-1 min-h-0 w-full flex flex-col">
                  {children}
                </div>
              </main>
            </div>
          </GestureGate>
        )}
      </body>
    </html>
  );
}
