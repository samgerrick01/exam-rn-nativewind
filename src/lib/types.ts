export type TasksStore = {
  tasks: TaskType[];
  addTasks: (newTasks: TaskDataType[]) => void;
};

export type TaskType = {
  uid: string;
  title: string;
  isDone: boolean;
};

export type TaskDataType = {
  id: number;
  uid: string;
  title: string;
  isDone: boolean;
};
