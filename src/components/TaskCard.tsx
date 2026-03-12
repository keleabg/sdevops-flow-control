import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, AlertCircle, Trash2, Edit2, CheckCircle2, Clock } from 'lucide-react';
import { Task, Priority, Status } from '../types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  Critical: 'text-red-400 bg-red-400/10 border-red-400/20',
  High: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

const statusIcons: Record<Status, React.ReactNode> = {
  Todo: <Clock className="w-4 h-4" />,
  'In Progress': <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />,
  Review: <AlertCircle className="w-4 h-4" />,
  Done: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-zinc-700 p-5 rounded-2xl transition-all hover:shadow-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          <span className={cn(
            'px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border',
            priorityColors[task.priority]
          )}>
            {task.priority}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-zinc-800 text-zinc-400 border border-zinc-700">
            {task.category}
          </span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-zinc-500 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className={cn(
        "text-lg font-semibold mb-2 transition-all",
        task.status === 'Done' ? "text-zinc-500 line-through" : "text-zinc-100"
      )}>
        {task.title}
      </h3>
      
      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={task.status}
            onChange={(e) => onUpdate(task.id, { status: e.target.value as Status })}
            className="bg-transparent text-xs font-medium text-zinc-400 focus:outline-none cursor-pointer hover:text-blue-400 transition-colors"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>
          <div className="flex items-center justify-center">
            {statusIcons[task.status]}
          </div>
        </div>
      </div>
    </motion.div>
  );
};