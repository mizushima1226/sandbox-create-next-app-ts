import { ITaskRepository } from '../../repositories/ITaskRepository';
import { Task } from '../../../domain/models/Task';

export class DeleteTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: number): Promise<Task> {
    const task = await this.taskRepository.find(id);
    return this.taskRepository.delete(task);
  }
}
