export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type Status = 'Todo' | 'In Progress' | 'Review' | 'Done';
export type Category = 'CI/CD' | 'Infrastructure' | 'Security' | 'Monitoring' | 'Cloud' | 'General';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: Category;
  dueDate: string;
  createdAt: string;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}