import moment from 'moment-timezone';

import { ITaskRepository } from '../../repositories/ITaskRepository';
import { Task } from '../../../domain/models/Task';

export class UpdateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: number, title: string, description: string): Promise<Task> {
    const task = await this.taskRepository.find(id);
    task.title = title;
    task.description = description;
    task.updatedAt = moment();
    return this.taskRepository.merge(task);
  }
}
