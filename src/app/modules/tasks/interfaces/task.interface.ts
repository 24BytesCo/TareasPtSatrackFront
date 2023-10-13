export interface Task {
  taskId: string;
  title: string;
  description: string;
  status: boolean;
  deadline: string;
  createdDate: string;
  lastUpdateDate: any;
  category: Category;
}

export interface Category {
  categoryId: string;
  name: string;
  status: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  deadline: string;
  categoryId: string;
}

export interface UpdateTaskRequest {
  taskId: string;
  deadline: string;
  status: boolean;
}
