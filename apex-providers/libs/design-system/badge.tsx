import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../shared/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-apex-deep-blue text-white hover:bg-apex-deep-blue/80",
        secondary: "border-transparent bg-quantum-teal text-white hover:bg-quantum-teal/80",
        destructive: "border-transparent bg-error-red text-white hover:bg-error-red/80",
        success: "border-transparent bg-success-green text-white hover:bg-success-green/80",
        warning: "border-transparent bg-warning-orange text-white hover:bg-warning-orange/80",
        outline: "text-charcoal-gray border-gray-300",
        education: "border-transparent bg-education-gold text-charcoal-gray hover:bg-education-gold/80",
        healthcare: "border-transparent bg-healthcare-red text-white hover:bg-healthcare-red/80",
        manufacturing: "border-transparent bg-manufacturing-gray text-white hover:bg-manufacturing-gray/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }