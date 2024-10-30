import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  inputStyle?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, inputStyle, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary focus:border-primary outline-none ring-orange-300 ring-offset-0 focus:ring transition-shadow duration-300 ease-in-out",
          {
            "!border-red-500 !ring-red-300": error,
          },
          className,
          inputStyle = inputStyle === "inputProduct" ? 'bg-muted/50 border-gray-400 mt-1' : '',
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
