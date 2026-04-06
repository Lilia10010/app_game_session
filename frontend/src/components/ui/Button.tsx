import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Definição do botão utilizando tailwind-variants conforme padrão agents.md.
 * O merge de classes externo acontece ao passar 'className' para a função 'button'.
 */
const button = tv({
  base: [
    "inline-flex items-center justify-center",
    "font-primary uppercase tracking-widest",
    "transition-all duration-300",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      primary: [
        "bg-neon-cyan/20",
        "border border-neon-cyan",
        "text-neon-cyan",
        "shadow-[0_0_15px_rgba(0,243,255,0.3)]",
        "hover:bg-neon-cyan hover:text-black-deep hover:shadow-[0_0_25px_rgba(0,243,255,0.6)]",
      ],
      secondary: [
        "bg-neon-pink/20",
        "border border-neon-pink",
        "text-neon-pink",
        "shadow-[0_0_15px_rgba(255,0,110,0.3)]",
        "hover:bg-neon-pink hover:text-white hover:shadow-[0_0_25px_rgba(255,0,110,0.6)]",
      ],
      outline: [
        "border border-white/30",
        "text-white",
        "hover:border-white hover:bg-white/10",
      ],
      ghost: [
        "text-white/70",
        "hover:text-white hover:bg-white/5",
      ],
    },
    size: {
      sm: "px-4 py-1.5 text-xs",
      md: "px-8 py-3 text-sm",
      lg: "px-12 py-4 text-base",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
          VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  fullWidth,
  className,
  ...props
}) => {
  return (
    <button
      className={button({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </button>
  );
};
