import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border-[3px] rounded-lg font-display text-sm font-bold uppercase tracking-[0.12em] whitespace-nowrap transition-all outline-none select-none focus-visible:shadow-[0_0_20px_rgba(196,30,45,0.6)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[var(--finals-red)] text-[var(--text-white)] border-[var(--finals-red)] shadow-[0_0_15px_rgba(196,30,45,0.5)] hover:bg-[var(--finals-red-bright)] hover:border-[var(--finals-red-bright)] hover:shadow-[0_0_25px_rgba(196,30,45,0.7)]",
        outline:
          "bg-transparent text-[var(--finals-red)] border-[var(--finals-red)] hover:bg-[var(--finals-red)] hover:text-[var(--text-white)] hover:shadow-[0_0_20px_rgba(196,30,45,0.5)]",
        secondary:
          "bg-[var(--bg-dark)] text-[var(--text-white)] border-[rgba(196,30,45,0.4)] hover:border-[var(--finals-red)] hover:text-[var(--finals-red)]",
        ghost:
          "bg-transparent text-[var(--text-gray)] border-transparent hover:text-[var(--finals-red)] hover:bg-[rgba(196,30,45,0.1)]",
        destructive:
          "bg-transparent text-[#FF3333] border-[#FF3333] hover:bg-[#FF3333] hover:text-[var(--bg-black)]",
        link: "text-[var(--finals-red)] underline-offset-4 hover:underline border-transparent bg-transparent",
      },
      size: {
        default:
          "h-10 gap-2 px-5 py-2",
        xs: "h-7 gap-1 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-4 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-6 text-base",
        icon: "size-10",
        "icon-xs":
          "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
