export const userGraphql = `#graphql
  type User {
    id: ID!
    username: String!
    password: String!
    email: String
    role: Role!
    createdAt: String
    token: String
  }

  input UserInput {
    username: String!
    password: String!
    email: String
    role: ID!
  }

  input Login {
    username: String!
    password: String!
  }

  type Token {
    token: String!
  }

  type GetAllUsers {
    users: [User!]!,
    totalPages: Int!
  }

  type Query {
    getUser(id: ID!): User!
    getAllUsers(search: String, page: Int, limit: Int): GetAllUsers!
  }

  type Mutation {
    login(input: Login): Token
    createUser(input: UserInput): User!
    updateUser(id: ID!,input: UserInput): User
    deleteUser(id: ID!, input: UserInput): Boolean
  }
`
