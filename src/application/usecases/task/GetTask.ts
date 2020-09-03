import { ITaskRepository } from '../../repositories/ITaskRepository';
import { Task } from '../../../domain/models/Task';

export class GetTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(id: number): Promise<Task> {
    return this.taskRepository.find(id);
  }
}
