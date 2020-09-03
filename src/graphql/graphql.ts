import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  allTasks: Array<Task>;
};

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type AllTasksQueryVariables = Exact<{ [key: string]: never }>;

export type AllTasksQuery = { __typename?: 'Query' } & {
  allTasks: Array<
    { __typename?: 'Task' } & Pick<Task, 'title' | 'description'>
  >;
};

export const AllTasksDocument = gql`
  query allTasks {
    allTasks {
      title
      description
    }
  }
`;

/**
 * __useAllTasksQuery__
 *
 * To run a query within a React component, call `useAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTasksQuery(
  baseOptions?: Apollo.QueryHookOptions<AllTasksQuery, AllTasksQueryVariables>,
) {
  return Apollo.useQuery<AllTasksQuery, AllTasksQueryVariables>(
    AllTasksDocument,
    baseOptions,
  );
}
export function useAllTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllTasksQuery,
    AllTasksQueryVariables
  >,
) {
  return Apollo.useLazyQuery<AllTasksQuery, AllTasksQueryVariables>(
    AllTasksDocument,
    baseOptions,
  );
}
export type AllTasksQueryHookResult = ReturnType<typeof useAllTasksQuery>;
export type AllTasksLazyQueryHookResult = ReturnType<
  typeof useAllTasksLazyQuery
>;
export type AllTasksQueryResult = Apollo.QueryResult<
  AllTasksQuery,
  AllTasksQueryVariables
>;
