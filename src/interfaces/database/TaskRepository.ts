import { Task } from '../../domain/models/Task'
import { ITaskRepository } from '../../application/repositories/ITaskRepository'
import { IDBConnection } from '../database/IDBConnection'
import moment from 'moment-timezone'

export class TaskRepository extends ITaskRepository {
    private connection: any

    constructor(connection: IDBConnection){
        super()
        this.connection = connection
    }

    //#region *** public method ***

    async find(id: number): Promise<Task> {
        let sql = 'SELECT * FROM tasks where id = ? limit 1'
        let result = await this.connection.execute(sql,id)
        return this.convertModel(result[0])
    }

    async findAll(): Promise<Task> {
        let sql = 'SELECT * FROM testdb.tasks;'
        let results = await this.connection.execute(sql)
        return results.map((r: any) => this.convertModel(r))
    }

    async persist(task: Task): Promise<Task> {
        let sql = 'insert into testdb.tasks (title, description, created_at) values (?, ?, ?)'
        let result = await this.connection.execute(sql,
            [
                task.title,
                task.description,
                task.getUTCCreatedAt(),
            ]
        )
        const id = await this.connection.execute('mysql_insert_id()')
        // task.id = result.insertId
        task.id = id
        return task;
    }

    async merge(task: Task):Promise<Task> {
        let sql = 'UPDATE tasks SET title = ?, description = ?, updated_at = ? WHERE id = ?'
        let params = [
            task.title,
            task.description,
            task.getUTCUpdatedAt(),
            task.id
        ]
        this.connection.execute(sql,params)
        return task
    }

    async delete(task: Task):Promise<Task> {
        let sql = 'DELETE FROM tasks WHERE id = ?'
        await this.connection.execute(sql,task.id)
        return this.convertModel(task)
    }

    //#endregion

    //#region *** private method ***

    private convertModel(r:any){
        let task = new Task()

        task.id = r.id
        task.title = r.title
        task.description = r.description
        task.createdAt = moment.tz(r.created_at, 'UTC')
        task.updatedAt = moment.tz(r.updated_at, 'UTC')

        return task
    }

    //#endregion

}