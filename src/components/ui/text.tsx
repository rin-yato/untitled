import React from "react"

import { cn } from "@/lib/utils"

type TextVariant =
  | "heading"
  | "subheading"
  | "smallheading"
  | "title"
  | "caption"
  | "body"

type Props = {
  variant?: TextVariant
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
  smallheading: {
    tag: "h2",
    tw: "scroll-m-20 text-2xl font-semibold tracking-tight",
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
  const tw = CONFIG[variant].tw

  return (
    <DynamicText {...rest} className={cn(tw, className)}>
      {children}
    </DynamicText>
  )
}
