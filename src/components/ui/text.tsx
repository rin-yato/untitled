import React from "react"

import { cn } from "@/lib/utils"

type TextVariant = "heading" | "subheading" | "title" | "caption" | "body"

type Props = {
  variant: TextVariant
  children: React.ReactNode
} & React.ComponentProps<"h1" | "h2" | "h3" | "p">

const CONFIG = {
  heading: {
    tag: "h1",
    tw: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  },
  subheading: {
    tag: "h2",
    tw: "scroll-m-20 text-3xl font-semibold tracking-tight",
  },
  title: {
    tag: "h3",
    tw: "scroll-m-20 text-xl font-semibold tracking-tight",
  },
  caption: {
    tag: "h4",
    tw: "scroll-m-20 text-lg tracking-tight",
  },
  body: {
    tag: "p",
    tw: "leading-7 [&:not(:first-child)]:mt-6",
  },
} as const

export default function Text({
  children,
  variant = "body",
  className,
  ...rest
}: Props) {
  const DynamicText = CONFIG[variant].tag

  return (
    <DynamicText {...rest} className={cn(CONFIG[variant].tw, className)}>
      {children}
    </DynamicText>
  )
}
