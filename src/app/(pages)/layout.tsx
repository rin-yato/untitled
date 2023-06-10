import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { Toaster } from "@/components/ui/toast/toaster"
import { AlertDialog, PickTableDialog } from "@/components/dialog"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen">
              <Sidebar />
              {children}
            </div>
            <TailwindIndicator />
            <Toaster />
            <AlertDialog />
            <PickTableDialog />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
