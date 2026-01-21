import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth";
import { CheckInBonusToast } from "@/components/auth/CheckInBonusToast";
import { ReferralBonusToast } from "@/components/auth/ReferralBonusToast";
import { PostHogProvider } from "./posthog-provider";
import { ReferralProvider } from "@/components/referral";

export const metadata: Metadata = {
  title: "AI Dream Interpretation - Unlock the Secrets of Your Dreams",
  description: "Use AI to interpret your dreams and discover hidden meanings, symbols, and insights from your subconscious mind.",
  keywords: ["dream interpretation", "dream analysis", "AI dreams", "dream symbols", "dream meaning"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <PostHogProvider>
          <AuthProvider>
            <ReferralProvider appName="解梦猫" sourceApp="jiemeng">
              {children}
              <CheckInBonusToast />
              <ReferralBonusToast />
            </ReferralProvider>
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
