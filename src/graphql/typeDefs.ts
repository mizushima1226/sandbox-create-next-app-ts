import gql from "graphql-tag";

export const typeDefs = gql`
type Query {
  users: [User!]!
  allTasks: [Task!]!
}

type User {
  name: String
  age: Int
}

type Task {
  id: ID!
  title: String!
  description: String
}

`;
