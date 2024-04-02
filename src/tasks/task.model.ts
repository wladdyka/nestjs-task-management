export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  open = 'open',
  inProgress = 'inProgress',
  done = 'done',
}
