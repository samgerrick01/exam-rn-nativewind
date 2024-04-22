import { useTaskStore } from '@src/lib/store';
import { supabase } from '@src/lib/supabase';
import { TaskType } from '@src/lib/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useTasksList = () => {
  const addTask = useTaskStore((state) => state.addTasks);
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        throw new Error(error?.message);
      }
      addTask(data);
      return data;
    },
  });
};

export const useInsertTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: TaskType) => {
      const { data: newTask, error } = await supabase
        .from('tasks')
        .insert({
          uid: task.uid,
          title: task.title,
          isDone: task.isDone,
        })
        .single();
      if (error) {
        throw new Error(error?.message);
      }
      return newTask;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: TaskType) => {
      const { data: updatedTask, error } = await supabase
        .from('tasks')
        .update({
          title: task.title,
          isDone: task.isDone,
        })
        .eq('uid', task.uid)
        .select()
        .single();
      if (error) {
        throw new Error(error?.message);
      }
      return updatedTask;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('tasks').delete().eq('uid', id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
