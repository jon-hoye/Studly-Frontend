import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ApiKeyProvider } from "@/lib/ApiKey";
import { ThemeProvider } from "@/lib/useTheme";
import BottomNav from './components/BottomNav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studly",
  description: "Dine Canvas ting samlet på ett sted",
};

const sansFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});
const monoFont = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `
  (function() {
    try {
      document.documentElement.classList.add('disable-transitions');
      const theme = localStorage.getItem('theme');
      const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && supportDarkMode)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased disable-transitions`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <ApiKeyProvider>
            <Navbar />
            {children}
            <BottomNav />
            <Footer />
          </ApiKeyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
