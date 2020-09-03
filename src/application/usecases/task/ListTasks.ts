import { ITaskRepository } from '../../repositories/ITaskRepository';
import { Task } from '../../../domain/models/Task';

export class ListTasks {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}
