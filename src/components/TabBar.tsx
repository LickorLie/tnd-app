import React from 'react';
import { Dices, Sparkles, Gift, MoreHorizontal } from 'lucide-react';

export type Tab = 'play' | 'social' | 'deals' | 'more';

const TABS: { id: Tab; label: string; Icon: React.FC<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'play', label: 'Play', Icon: Dices },
  { id: 'social', label: 'Social', Icon: Sparkles },
  { id: 'deals', label: 'Deals', Icon: Gift },
  { id: 'more', label: 'More', Icon: MoreHorizontal },
];

const TabBar: React.FC<{ active: Tab; onChange: (t: Tab) => void }> = ({ active, onChange }) => (
  <nav className="shrink-0 border-t border-sand bg-paper pb-safe">
    <div className="mx-auto max-w-2xl flex justify-around pt-2">
      {TABS.map(({ id, label, Icon }) => {
        const on = id === active;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 text-[11px] font-medium ${on ? 'text-rouge' : 'text-muted'}`}
            aria-current={on ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={1.5} />
            {label}
          </button>
        );
      })}
    </div>
  </nav>
);

export default TabBar;
