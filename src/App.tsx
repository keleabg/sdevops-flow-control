import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { 
  LayoutGrid,
  List,
  Command,
  Github,
  Settings,
  Plus
} from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { Dashboard } from './components/Dashboard';
import { TaskCard } from './components/TaskCard';
import { TaskDialog } from './components/TaskDialog';
import { Priority } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, stats } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 transition-colors duration-300">
        <Toaster position="top-right" />
        
        {/* Background decoration */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
            style={{ 
              backgroundImage: `url('https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/481ec65a-49c6-406b-bbad-309d55d3d0f4/dashboard-bg-36c4116c-1773323456904.webp')`, 
              backgroundSize: 'cover' 
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header / Navbar */}
          <Navbar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onNewTask={() => setIsDialogOpen(true)} 
          />

          {/* Dashboard Stats */}
          <Dashboard stats={stats} />

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
              {(['All', 'Critical', 'High', 'Medium', 'Low'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
                    filterPriority === p 
                      ? "bg-foreground text-background border-foreground" 
                      : "bg-secondary/50 text-muted-foreground border-border hover:border-accent"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-secondary/50 border border-border p-1 rounded-xl">
              <button 
                onClick={() => setView('grid')}
                className={cn("p-1.5 rounded-lg transition-all", view === 'grid' ? "bg-accent text-blue-400" : "text-muted-foreground hover:text-foreground")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('list')}
                className={cn("p-1.5 rounded-lg transition-all", view === 'list' ? "bg-accent text-blue-400" : "text-muted-foreground hover:text-foreground")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tasks Display */}
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <Command className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-semibold text-foreground/80">No pipelines running...</h3>
              <p className="text-muted-foreground mt-2">Create your first DevOps task to get started.</p>
              <button 
                onClick={() => setIsDialogOpen(true)}
                className="mt-6 text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add your first task
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className={cn(
                "grid gap-6",
                view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}
            >
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onUpdate={updateTask} 
                    onDelete={deleteTask} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <TaskDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          onSubmit={addTask} 
        />

        {/* Footer / Info */}
        <footer className="relative z-10 max-w-7xl mx-auto px-4 py-12 border-t border-border mt-20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © 2024 DevOpsFlow Engine. Systems Nominal.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;