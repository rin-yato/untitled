"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import Text from "@/components/ui/text"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <span
      className="clickable flex flex-1 items-center gap-2.5 rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-primary "
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icons.sun
        size="20"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Icons.moon
        size="20"
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <Text variant="caption">Toggle Theme</Text>
    </span>
  )
}
