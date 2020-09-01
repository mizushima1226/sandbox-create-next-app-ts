import { ApolloServer, gql } from 'apollo-server-micro'

import { TasksController } from '../../interfaces/controllers/TaskController'
import { MySqlConnection } from '../../infrastructure/MySqlConnection'

const mysqlConnection = new MySqlConnection()
const taskController = new TasksController(mysqlConnection)

import { QueryResolvers, Resolvers } from 'src/generated/resolver'

//TypeDefsの生成→ https://github.com/dotansimha/graphql-code-generator/issues/3899
const typeDefs = gql`
  type Query {
    users: [User!]!
    allTasks: [Task!]!
  }
  type User {
    name: String
  }
  type Task {
    title: String!
    description: String
  }
`

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