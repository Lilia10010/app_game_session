import { twMerge as tailwindMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

/**
 * Utilitário para mesclar classes Tailwind corretamente, resolvendo conflitos.
 * Nota: 'tailwind-variants' já lida com o merge internamente se o componente for configurado corretamente.
 */
export function twMerge(...inputs: ClassValue[]) {
  return tailwindMerge(clsx(inputs));
}
