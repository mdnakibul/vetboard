import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { buttonVariants } from "./button-variants"
import { cn } from "@/lib/utils" // ✅ Make sure this path is correct or adjust accordingly

import type { VariantProps } from "class-variance-authority" // ✅ Needed for VariantProps

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button }
