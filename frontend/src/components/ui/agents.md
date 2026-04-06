# Padrões de Componentes UI - Sueca Futurista

Este documento define os padrões técnicos para a criação de novos componentes na pasta `src/components/ui`. Siga estas regras para manter a consistência e a performance do design system.

## 🛠️ Tecnologias
- **Tailwind Variants (tv)**: Para gerenciamento de variantes e estados.
- **Tailwind Merge (twMerge)**: Para resolução inteligente de conflitos de classes CSS.

## 📐 Estrutura do Componente

### 1. Definição de Estilos com `tv`
Sempre defina os estilos fora do componente funcional usando a função `tv`. 
Utilize **arrays `[]`** para dividir a formatação por tópicos (layout, cores, bordas, efeitos).

```tsx
const button = tv({
  base: [
    "flex items-center", // Layout
    "transition-all",    // Animação
    "font-primary",      // Tipografia
  ],
  variants: {
    variant: {
      primary: [
        "bg-neon-cyan/20",
        "border border-neon-cyan",
        "shadow-[0_0_15px_rgba(0,243,255,0.3)]",
      ],
    }
  }
});
```

### 2. Mesclagem de Classes (Merging)
**Não utilize `twMerge` manualmente dentro do componente** se estiver usando as variantes do `tv`. O `tailwind-variants` já realiza o merge interno quando você passa a propriedade `className` para a função resultante.

```tsx
// ✅ CORRETO
export const Button = ({ variant, className, ...props }) => {
  return (
    <button className={button({ variant, className })} {...props} />
  );
};

// ❌ INCORRETO (Redundante)
export const Button = ({ variant, className, ...props }) => {
  return (
    <button className={twMerge(button({ variant }), className)} {...props} />
  );
};
```

## 🎨 Guia de Estilo
- **Fontes**: Use `font-primary` para títulos/botões e `font-secondary` para textos longos.
- **Cores**: Priorize as variáveis do tema (`neon-cyan`, `neon-pink`, etc.) com opacidades para efeitos de brilho.
- **Bordas**: Componentes futuristas devem ter bordas sutis e decorações nos cantos quando possível.

## 📝 Documentação de Props
Utilize o tipo `VariantProps<typeof component>` para exportar automaticamente as tipagens das variantes para o TypeScript.
