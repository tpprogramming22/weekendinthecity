'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "red" | "pink" | "orange" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          {
            "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5": variant === "default",
            "bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5": variant === "red",
            "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5": variant === "pink",
            "bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5": variant === "orange",
            "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400": variant === "outline",
            "text-gray-700 hover:bg-gray-50": variant === "ghost",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
