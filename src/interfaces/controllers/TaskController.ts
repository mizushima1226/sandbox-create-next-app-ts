import { TaskSerializer } from '../serializers/TaskSerializer';
import { TaskRepository } from '../database/TaskRepository';
import { IDBConnection } from '../database/IDBConnection';
import { UpdateTask } from '../../application/usecases/task/UpdateTask';
import { DeleteTask } from '../../application/usecases/task/DeleteTask';
import { CreateTask } from '../../application/usecases/task/CreateTask';
import { GetTask } from '../../application/usecases/task/GetTask';
import { ListTasks } from '../../application/usecases/task/ListTasks';

export class TasksController {
  private taskRepository: TaskRepository;

  constructor(dbConnection: IDBConnection) {
    this.taskRepository = new TaskRepository(dbConnection);
  }

  async findTask(req: any) {
    const { id } = req.params;
    const useCase = new GetTask(this.taskRepository);
    const result = await useCase.execute(id);
    return TaskSerializer.serialize(result);
  }

  async findAll() {
    const useCase = new ListTasks(this.taskRepository);
    const result = await useCase.execute();
    return TaskSerializer.serialize(result);
  }

  async createTask(req: any) {
    const { title, description } = req.body;
    const useCase = new CreateTask(this.taskRepository);
    const result = await useCase.execute(title, description);
    return TaskSerializer.serialize(result);
  }

  async updateTask(req: any) {
    const { id } = req.param;
    const { title, description } = req.body;
    const useCase = new UpdateTask(this.taskRepository);
    const result = await useCase.execute(id, title, description);
    return TaskSerializer.serialize(result);
  }

  async deleteTask(req: any) {
    const { id } = req.param;
    const useCase = new DeleteTask(this.taskRepository);
    const result = await useCase.execute(id);
    return TaskSerializer.serialize(result);
  }
}
