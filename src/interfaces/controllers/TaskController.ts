import { TaskSerializer } from '../serializers/TaskSerializer'
import { TaskRepository } from '../database/TaskRepository'
import { IDBConnection } from '../database/IDBConnection'
import { UpdateTask } from '../../application/usecases/task/UpdateTask'
import { DeleteTask } from '../../application/usecases/task/DeleteTask'
import { CreateTask } from '../../application/usecases/task/CreateTask'
import { GetTask } from '../../application/usecases/task/GetTask'
import { ListTasks } from '../../application/usecases/task/ListTasks'

export class TasksController {
    private taskSerializer: TaskSerializer
    private taskRepository: TaskRepository

    constructor(dbConnection: IDBConnection){
        this.taskSerializer = new TaskSerializer()
        this.taskRepository = new TaskRepository(dbConnection)
    }

    async findTask(req: any) {
        const id = req.params.id
        const useCase = new GetTask(this.taskRepository)
        let result = await useCase.execute(id)
        return this.taskSerializer.serialize(result)
    }

    async findAll(){
        const useCase = new ListTasks(this.taskRepository)
        let result = await useCase.execute()
        return this.taskSerializer.serialize(result)
    }

    async createTask(req: any) {
        const { title, description } = req.body
        console.log("this is request body",title,description)
        const useCase = new CreateTask(this.taskRepository)
        let result = await useCase.execute(title, description)
        return this.taskSerializer.serialize(result)
    }

    async updateTask(req: any){
        const id = req.param.id
        const { title, description} = req.body
        const useCase = new UpdateTask(this.taskRepository)
        let result = await useCase.execute(id, title, description)
        return this.taskSerializer.serialize(result)
    }

    async deleteTask(req: any){
        const id = req.param.id
        const useCase = new DeleteTask(this.taskRepository)
        let result = await useCase.execute(id)
        return this.taskSerializer.serialize(result)
    }

}