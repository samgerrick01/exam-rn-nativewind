import { FontAwesome } from '@expo/vector-icons';
import {
  useDeleteTask,
  useInsertTask,
  useTasksList,
  useUpdateTask,
} from '@src/api/tasks';
import { ButtonComponent, Task, TextInputComponent } from '@src/components';
import { useTaskStore } from '@src/lib/store';
import { TaskType } from '@src/lib/types';
import * as Crypto from 'expo-crypto';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const FirstScreen = () => {
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const { tasks } = useTaskStore((state) => state);

  const { error, isLoading } = useTasksList();
  const { mutate: insertTask, isPending: insertLoading } = useInsertTask();
  const { mutate: updateTask, isPending: updateLoading } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const handleAddTask = () => {
    if (text.trim() === '') {
      return;
    }
    if (isEdit && selectedTask !== null) {
      updateTask(
        { title: text, isDone: selectedTask?.isDone, uid: selectedTask?.uid },
        {
          onSuccess: () => {
            setText('');
            setIsEdit(false);
            setSelectedTask(null);
          },
        }
      );
    } else {
      insertTask(
        { uid: Crypto.randomUUID(), title: text, isDone: false },
        {
          onSuccess: () => {
            setText('');
          },
        }
      );
    }
  };

  const handleUpdateTask = (task: TaskType) => {
    setIsEdit(true);
    setSelectedTask(task);
    setText(task.title);
  };

  const handleChangeTaskStatus = (task: TaskType) => {
    updateTask({ ...task, isDone: !task.isDone });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  if (error) {
    return <Text>Failed to Fetch Data</Text>;
  }

  return (
    <View className='flex-1 items-center p-5 bg-white '>
      <StatusBar style='auto' hidden />
      <Text className=' text-3xl font-bold mb-2'>Simple CRUD Task List!</Text>

      <View className=' w-full flex-row justify-between'>
        <TextInputComponent
          width='w-9/12'
          placeholder='Enter a task'
          value={text}
          onChangeText={setText}
        />
        <ButtonComponent onPress={handleAddTask} width='w-1/5'>
          {isEdit ? (
            updateLoading ? (
              <ActivityIndicator size='small' color='#0000ff' />
            ) : (
              <FontAwesome name='save' size={24} color='black' />
            )
          ) : insertLoading ? (
            <ActivityIndicator size='small' color='#0000ff' />
          ) : (
            <FontAwesome name='plus' size={24} color='black' />
          )}
        </ButtonComponent>
      </View>

      <Text className='w-full mt-2 text-lg'>Total Task: {tasks.length}</Text>

      {isLoading && <ActivityIndicator size='large' color='#0000ff' />}
      <FlatList
        className='w-full mt-3 mb-3 '
        data={tasks}
        renderItem={({ item }) => (
          <Task
            task={item}
            handleUpdateTask={handleUpdateTask}
            handleChangeTaskStatus={handleChangeTaskStatus}
            handleDeleteTask={handleDeleteTask}
          />
        )}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
};

export default FirstScreen;
