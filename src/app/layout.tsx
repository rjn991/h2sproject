import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Heart, Shield } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BridgeLink | Crisis Response",
  description: "Bridging the gap between donors and camps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased`}>
        <header>
          <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link 
                href="/" 
                className="flex items-center space-x-2 transition-opacity hover:opacity-80"
                aria-label="BridgeLink Home"
              >
                <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">BridgeLink</span>
              </Link>
              
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50" role="group" aria-label="View Switcher">
                <Link 
                  href="/donor" 
                  className="flex items-center space-x-2 px-4 py-1.5 rounded-xl text-sm font-bold transition-all hover:bg-white hover:shadow-sm"
                  aria-label="Go to Donor View"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="hidden sm:inline">Donor View</span>
                </Link>
                <Link 
                  href="/manager" 
                  className="flex items-center space-x-2 px-4 py-1.5 rounded-xl text-sm font-bold transition-all hover:bg-white hover:shadow-sm text-slate-600"
                  aria-label="Go to Camp View"
                >
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="hidden sm:inline">Camp View</span>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
