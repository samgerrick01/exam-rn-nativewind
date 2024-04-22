import { create } from 'zustand';
import { TaskDataType, TaskType, TasksStore } from './types';

export const useTaskStore = create<TasksStore>((set) => ({
  tasks: [],
  addTasks: (newTasks: TaskDataType[]) => {
    set((state) => ({
      tasks: newTasks.sort((a, b) => a.id - b.id),
    }));
  },
}));
