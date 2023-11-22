export const menuParentGraphql = `#graphql
  type MenuParent {
    id: ID!
    name: String!
    order: Int
  }

  input MenuParentInput {
    name: String!
    order: Int
  }

  type Query {
    getMenuParent(id: ID!): MenuParent
    getAllMenuParents: [MenuParent!]!
    # getMenuParent Dropdown: Object
  }

  type Mutation {
    createMenuParent(input: MenuParentInput): MenuParent!
    updateMenuParent(id: ID!, input: MenuParentInput): MenuParent
    deleteMenuParent(id: ID!): Boolean
  }
`