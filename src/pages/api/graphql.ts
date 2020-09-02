import { ApolloServer } from 'apollo-server-micro'

import { TasksController } from '../../interfaces/controllers/TaskController'
import { MySqlConnection } from '../../infrastructure/MySqlConnection'

const mysqlConnection = new MySqlConnection()
const taskController = new TasksController(mysqlConnection)

import { QueryResolvers, Resolvers } from 'src/generated/resolver'
import { typeDefs } from 'src/generated/typeDefs';

const Query: QueryResolvers = {
  users() {
    return [{ name: 'Nextjs', age: 12 }]
  },
  async allTasks(){
    let result  = await taskController.findAll()
    return result
  }
}

const resolvers: Resolvers = {
  Query,
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })