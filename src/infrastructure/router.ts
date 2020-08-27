import express from 'express'
import { TasksController } from '../interfaces/controllers/TaskController'
import { MySqlConnection } from './MySqlConnection'

const mysqlConnection = new MySqlConnection()
const taskController = new TasksController(mysqlConnection)
let router = express.Router()

router.get('/tasks', async(req: express.Request, res: express.Response) => {
    let result = await taskController.findAll()
    res.send(result)
})

router.get('/tasks/:id', async(req: express.Request, res: express.Response) => {
    let result = await taskController.findTask(req)
    res.send(result)
})

router.post('/tasks', async(req: express.Request, res: express.Response) => {
    let result = await taskController.createTask(req)
    res.json(result)
})

router.patch('/tasks/:id', async(req: express.Request, res: express.Response) => {
    let result = await taskController.updateTask(req)
    res.send(result)
})

router.delete('/tasks/:id', async(req: express.Request, res: express.Response) => {
    let result = await taskController.deleteTask(req)
    res.send(result)
})

module.exports = {router}

// export default router