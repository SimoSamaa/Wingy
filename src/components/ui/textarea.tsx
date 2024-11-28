import React, { useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
import debounce from "@/lib/debounce.ts";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  debounce?: number;
  onChange?: (value: string) => void;
  error?: string;
  inputStyle?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, inputStyle, error, onChange = () => { }, debounce: delay, maxLength = 300, ...props }, ref) => {
    const [count, setCount] = useState(0);
    const [localValue, setLocalValue] = useState(value || "");

    useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);

    useEffect(() => setCount(String(localValue).length || 0), [String(localValue).length]);

    const handleChange = useCallback(
      delay
        ? debounce((newValue: string) => onChange(newValue), delay)
        : (newValue: string) => onChange(newValue),
      [onChange, delay]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      handleChange(newValue);
    };

    return (
      <div className="relative">
        <textarea
          maxLength={maxLength}
          onChange={handleInputChange}
          value={localValue}
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
          <div className="ml-auto">{`${count}/${maxLength}`}</div>
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };