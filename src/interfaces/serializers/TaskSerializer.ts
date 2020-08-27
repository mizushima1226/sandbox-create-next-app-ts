import { Task } from '../../domain/models/Task'
import moment from 'moment-timezone'

const _serializeStringTask = (task: Task) => {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        createdAt: moment(task.createdAt).tz('Asia/Tokyo').format(),
        updatedAt: moment(task.updatedAt).tz('Asia/Tokyo').format()
    }
}

export class TaskSerializer {
    serialize(data: any) {
        if(!data){
            throw new Error(`expect data to be not undefined or null`)
        }
        
        if(Array.isArray(data)){
            return data.map((obj) => _serializeStringTask(obj))
        }

        return _serializeStringTask(data)
    }
}