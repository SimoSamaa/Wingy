import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputStyle?: string;
  error?: string;
  maxlength?: number;
  value?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, inputStyle, error, maxlength = 300, ...props }, ref) => {
    const [count, setCount] = useState(0);
    useEffect(() => setCount(props.value?.length || 0), [props.value]);

    return (
      <div className="relative">
        <textarea
          maxLength={maxlength}
          onInput={(e) => {
            const length = (e.target as HTMLTextAreaElement).value.length;
            setCount(length);
          }}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary focus:border-primary outline-none ring-orange-300 ring-offset-0 focus:ring transition-shadow duration-300 ease-in-out",
            className,
            inputStyle = inputStyle === "inputProduct" ? 'bg-muted/50 border-gray-400 mt-1' : '',
            { "!border-red-500 !ring-red-300": error, },
          )}
          ref={ref}
          {...props}
        />
        <div className="flex justify-between mt-1 text-xs">
          {error && <p className='text-red-500'>{error}</p>}
          <div className="ml-auto">{`${count}/${maxlength}`}</div>
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
