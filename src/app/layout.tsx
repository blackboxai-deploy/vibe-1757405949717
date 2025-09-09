import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/navigation/sidebar";

export const metadata: Metadata = {
  title: "Gaming Hub - Your Ultimate Gaming Dashboard",
  description: "Manage your game library, track achievements, connect with friends, and discover new games in your personal gaming hub.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* Sidebar Navigation */}
            <Sidebar />
            
            {/* Main Content */}
            <main className="flex-1 ml-64 p-6 overflow-auto">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}