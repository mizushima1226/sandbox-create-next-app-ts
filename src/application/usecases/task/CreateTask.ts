import moment from 'moment-timezone';

import { Task } from '../../../domain/models/Task';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(title: string, description: string): Promise<Task> {
    const dt = moment.tz();
    const task = new Task(title, description, dt);
    return this.taskRepository.persist(task);
  }
}
