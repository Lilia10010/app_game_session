import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const input = tv({
  base: [
    "w-full",
    "bg-white/5",
    "border border-white/20",
    "px-4 py-2",
    "text-white",
    "focus:border-neon-cyan",
    "focus:outline-none focus:ring-1 focus:ring-neon-cyan/50",
    "transition-all duration-300",
  ],
  variants: {
    error: {
      true: "border-neon-pink",
    },
  },
  defaultVariants: {
    error: false,
  },
});

interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement>, 
          VariantProps<typeof input> {
  label?: string;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  errorMessage,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full font-secondary">
      {label && (
        <label className="text-xs uppercase tracking-tighter text-white/50 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          className={input({ error, className })}
        />
        {/* Glow animado no foco (opcional) */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 focus-within:opacity-100 shadow-[0_0_15px_rgba(0,243,255,0.2)]"></div>
      </div>
      {errorMessage && (
        <span className="text-[10px] text-neon-pink mt-1 uppercase tracking-wider italic">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
