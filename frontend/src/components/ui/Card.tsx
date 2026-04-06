import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const card = tv({
  base: [
    "relative overflow-hidden",
    "border border-white/10",
    "bg-black-soft/70",
    "backdrop-blur-md",
    "transition-all duration-500",
    "p-6",
  ],
  variants: {
    interactive: {
      true: [
        "cursor-pointer",
        "hover:border-neon-cyan/50",
        "hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]",
      ],
    },
  },
  defaultVariants: {
    interactive: false,
  },
});

interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
          VariantProps<typeof card> {
  title?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  interactive,
  className,
  ...props
}) => {
  return (
    <div
      className={card({ interactive, className })}
      {...props}
    >
      {/* Decoração de Canto Superior Direito */}
      <div className="absolute top-0 right-0 w-8 h-8 flex">
        <div className="w-[1px] h-full bg-neon-cyan/40"></div>
        <div className="h-[1px] w-full bg-neon-cyan/40"></div>
      </div>

      {title && (
        <div className="mb-6">
          <h3 className="text-xl font-primary text-neon-cyan tracking-widest uppercase">
            {title}
          </h3>
          <div className="h-[2px] w-12 bg-neon-cyan mt-1 shadow-[0_0_8px_rgba(0,243,255,0.8)]"></div>
        </div>
      )}

      <div className="relative z-10 text-white/80 font-secondary">
        {children}
      </div>
    </div>
  );
};
