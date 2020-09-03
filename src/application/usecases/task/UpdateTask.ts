import moment from 'moment-timezone';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class UpdateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: number, title: string, description: string) {
    let task = await this.taskRepository.find(id);
    task.title = title;
    task.description = description;
    task.updatedAt = moment();
    return this.taskRepository.merge(task);
  }
}
