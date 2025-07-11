
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onChange, onKeyDown, maxLength, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      // If maxLength is specified, enforce it
      if (maxLength && value.length > maxLength) {
        e.target.value = value.slice(0, maxLength);
      }
      
      // Allow only numbers and commas, limit to specified maxLength or 25 characters
      const limit = maxLength || 25;
      const filteredValue = e.target.value.replace(/[^0-9,]/g, '').slice(0, limit);
      
      // Update the input value
      e.target.value = filteredValue;
      
      // Call the original onChange if provided
      if (onChange) {
        onChange(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent 'e', 'E', '+', '-' from being typed (common in number inputs)
      if (['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }
      
      // Call the original onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
