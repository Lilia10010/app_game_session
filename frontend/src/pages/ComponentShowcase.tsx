import React from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Layers, MousePointer2, Type, Layout } from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-16">
      <header className="space-y-4 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-primary text-neon-cyan tracking-tighter uppercase">
          Style Guide / UI Components
        </h1>
        <p className="text-white/50 font-secondary max-w-2xl">
          Biblioteca de componentes padronizada com Tailwind Variants e design futurista. 
          Consulte o arquivo <code className="text-neon-pink">agents.md</code> para regras de implementação.
        </p>
      </header>

      {/* Seção de Botões */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-neon-purple uppercase font-primary tracking-widest text-sm">
          <MousePointer2 size={18} /> Botões (Variants & Sizes)
        </div>
        
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xs text-white/30 uppercase font-mono tracking-tighter">Estilos (Variants)</h4>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs text-white/30 uppercase font-mono tracking-tighter">Tamanhos (Sizes)</h4>
            <div className="flex flex-wrap items-end gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium (Default)</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs text-white/30 uppercase font-mono tracking-tighter">Estados Especiais</h4>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled State</Button>
              <Button fullWidth>Full Width Button Example</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Seção de Inputs */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-neon-green uppercase font-primary tracking-widest text-sm">
          <Type size={18} /> Campos de Entrada (Inputs)
        </div>
        
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input label="Label padrão" placeholder="Digite algo..." />
            <Input label="Com erro" placeholder="Valor inválido" error errorMessage="Este campo é obrigatório" />
          </div>
          <div className="space-y-4">
             <Input label="Efeito de Foco" placeholder="Clique para brilho" />
             <Input label="Valor desabilitado" value="Não editável" disabled />
          </div>
        </Card>
      </section>

      {/* Seção de Cards */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-neon-cyan uppercase font-primary tracking-widest text-sm">
          <Layers size={18} /> Containers (Cards)
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card title="Card com Título">
            <p className="text-sm">
              Um card padrão com decoração futurista nos cantos e título estilizado.
              Ideal para agrupar conteúdos relacionados.
            </p>
          </Card>

          <Card title="Interativo (Hover)" interactive>
            <p className="text-sm">
              Passe o mouse para ver o efeito de brilho dinâmico e cursor interativo.
              Utilizado para atalhos e itens clicáveis.
            </p>
          </Card>
        </div>
      </section>

      {/* Seção de Tipografia */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-white/40 uppercase font-primary tracking-widest text-sm">
           <Layout size={18} /> Tipografia do Sistema
        </div>
        
        <Card className="space-y-8">
           <div className="space-y-2">
              <span className="text-[10px] font-mono text-neon-cyan">FONT-PRIMARY (ORBITRON)</span>
              <h2 className="text-3xl">Design de Interface Futurista</h2>
           </div>
           
           <div className="space-y-2">
              <span className="text-[10px] font-mono text-neon-pink">FONT-SECONDARY (RAJDHANI)</span>
              <p className="text-xl max-w-3xl leading-relaxed">
                 A Sueca é muito mais que um jogo de cartas. É um ritual social onde cada jogada
                 pode mudar o destino da noite. Prepare o seu baralho e siga as ordens do Host.
              </p>
           </div>

           <div className="space-y-2">
              <span className="text-[10px] font-mono text-neon-green">FONT-MONO (SHARE TECH MONO)</span>
              <p className="font-mono text-sm uppercase">SESSION_ID: 1234-ABCD-5678-EFGH | STATUS: IN_PROGRESS</p>
           </div>
        </Card>
      </section>
    </div>
  );
};
