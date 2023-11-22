export const roleGraphql = `#graphql
  scalar Object
  type Role {
    id: ID!
    name: String!
    permission: [Permission!]!
  }

  input RoleInput {
    name: String!
    permission: [ID]!
  }

  type Query {
    getRole(id: ID!): Role
    getAllRoles(amount: Int): [Role!]!
    getRoleDropdown: Object
  }

  type Mutation {
    createRole(input: RoleInput): Role!
    updateRole(id: ID!, input: RoleInput): Role
    deleteRole(id: ID!): Boolean
  }
`