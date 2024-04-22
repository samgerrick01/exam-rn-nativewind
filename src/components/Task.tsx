import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { TaskType } from '@src/lib/types';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

type TaskProps = {
  task: TaskType;
  handleUpdateTask: (task: TaskType) => void;
  handleChangeTaskStatus: (task: TaskType) => void;
  handleDeleteTask: (id: string) => void;
};

const Task = (props: TaskProps) => {
  const { task, handleUpdateTask, handleChangeTaskStatus, handleDeleteTask } =
    props;
  return (
    <View className=' flex-row rounded-lg justify-between bg-white   border p-2 items-center'>
      <View className='flex-row gap-1 w-3/4 items-center'>
        <Pressable onPress={() => handleChangeTaskStatus(task)}>
          <MaterialCommunityIcons
            name={
              task.isDone
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
            size={28}
            color={task.isDone ? 'teal' : 'grey'}
          />
        </Pressable>
        <Text
          className={`${task.isDone && 'line-through'} text-lg `}
          numberOfLines={1}
        >
          {task.title}
        </Text>
      </View>
      {!task.isDone && (
        <FontAwesome
          onPress={() => handleUpdateTask(task)}
          name='edit'
          size={24}
          color='blue'
        />
      )}

      <FontAwesome
        onPress={() => handleDeleteTask(task.uid)}
        name='trash'
        size={24}
        color='red'
      />
    </View>
  );
};

export default Task;
