import React from 'react';
import { Terminal, Search, Plus } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNewTask: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onNewTask }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
          <Terminal className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            DevOps<span className="text-blue-500">Flow</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Streamline your infrastructure workflows</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search infrastructure tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-2.5 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          <button 
            onClick={onNewTask}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};