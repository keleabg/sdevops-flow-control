import React from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  LayoutDashboard, 
  Terminal, 
  Activity,
  Layers
} from 'lucide-react';
import { TaskStats } from '../types';

interface DashboardProps {
  stats: TaskStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const cards = [
    { 
      label: 'Total Tasks', 
      value: stats.total, 
      icon: Layers, 
      color: 'text-blue-400', 
      bg: 'bg-blue-400/10' 
    },
    { 
      label: 'In Progress', 
      value: stats.inProgress, 
      icon: Activity, 
      color: 'text-amber-400', 
      bg: 'bg-amber-400/10' 
    },
    { 
      label: 'Pending', 
      value: stats.todo, 
      icon: Clock, 
      color: 'text-zinc-400', 
      bg: 'bg-zinc-400/10' 
    },
    { 
      label: 'Completed', 
      value: stats.done, 
      icon: CheckCircle2, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/10' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div 
          key={card.label}
          className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl flex items-center justify-between"
        >
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
            <h3 className="text-3xl font-bold text-white">{card.value}</h3>
          </div>
          <div className={`${card.bg} p-3 rounded-xl`}>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};