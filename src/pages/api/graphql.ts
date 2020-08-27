import { ApolloServer, gql } from 'apollo-server-micro'

import { TasksController } from '../../interfaces/controllers/TaskController'
import { MySqlConnection } from '../../infrastructure/MySqlConnection'

const mysqlConnection = new MySqlConnection()
const taskController = new TasksController(mysqlConnection)

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

const mockData = [
  {title: "title1", description:"desc1"},
  {title: "title1", description:"desc1"},
  {title: "title1", description:"desc1"},
]

const resolvers = {
  Query: {
    users() {
      return [{ name: 'Nextjs' }]
    },
    async allTasks(){
      let result = await taskController.findAll()
      console.log("ok",result)
      return result
    }
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })