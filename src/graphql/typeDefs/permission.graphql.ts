export const permissionGraphql = `#graphql
  type Permission {
    id: ID!
    name: String!
    role: [Role!]!
  }

  input PermissionInput {
    name: String!
    role: [ID]!
  }

  type Query {
    getPermission(id: ID!): Permission
    getAllPermissions(amount: Int): [Permission!]!
    getPermissionDropdown: Object
  }

  type Mutation {
    createPermission(input: PermissionInput): Permission!
    updatePermission(id: ID!, input: PermissionInput): Permission
    deletePermission(id: ID!): Boolean
  }
`