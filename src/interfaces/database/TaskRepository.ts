import moment from 'moment-timezone';
import { Task } from '../../domain/models/Task';
import { ITaskRepository } from '../../application/repositories/ITaskRepository';
import { IDBConnection } from './IDBConnection';

export class TaskRepository extends ITaskRepository {
  private connection: any;

  constructor(connection: IDBConnection) {
    super();
    this.connection = connection;
  }

  // #region *** public method ***

  async find(id: number): Promise<Task> {
    const sql = 'SELECT * FROM tasks where id = ? limit 1';
    const result = await this.connection.execute(sql, id);
    return TaskRepository.convertModel(result[0]);
  }

  async findAll(): Promise<Task[]> {
    const sql = 'SELECT * FROM testdb.tasks;';
    const results = await this.connection.execute(sql);
    return results.map((r: any) => TaskRepository.convertModel(r));
  }

  async persist(task: Task): Promise<Task> {
    const sql = 'INSERT INTO testdb.tasks (title, description, created_at) values (?, ?, ?)';
    const result = await this.connection.execute(sql, [
      task.title,
      task.description,
      task.getUTCCreatedAt(),
    ]);
    const insertedTask = new Task(result.insertId, task.title, task.description);
    return insertedTask;
  }

  async merge(task: Task): Promise<Task> {
    const sql = 'UPDATE tasks SET title = ?, description = ?, updated_at = ? WHERE id = ?';
    const params = [task.title, task.description, task.getUTCUpdatedAt(), task.id];
    this.connection.execute(sql, params);
    return task;
  }

  async delete(task: Task): Promise<Task> {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    await this.connection.execute(sql, task.id);
    return TaskRepository.convertModel(task);
  }

  // #endregion

  // #region *** private method ***

  private static convertModel(r: any): Task {
    const task = new Task();

    task.id = r.id;
    task.title = r.title;
    task.description = r.description;
    task.createdAt = moment.tz(r.created_at, 'UTC');
    task.updatedAt = moment.tz(r.updated_at, 'UTC');

    return task;
  }

  // #endregion
}
