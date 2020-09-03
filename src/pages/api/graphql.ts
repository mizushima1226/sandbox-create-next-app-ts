import { ApolloServer } from 'apollo-server-micro';

import { QueryResolvers, Resolvers } from 'src/graphql/resolver';
import { typeDefs } from 'src/graphql/typeDefs';
import { TasksController } from '../../interfaces/controllers/TaskController';
import { MySqlConnection } from '../../infrastructure/MySqlConnection';

const mysqlConnection = new MySqlConnection();
const taskController = new TasksController(mysqlConnection);

const Query: QueryResolvers = {
  users() {
    return [{ name: 'Nextjs', age: 12 }];
  },
  async allTasks() {
    const result = await taskController.findAll();
    return result;
  },
};

const resolvers: Resolvers = {
  Query,
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
