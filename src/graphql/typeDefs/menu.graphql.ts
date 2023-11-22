export const menuGraphql = `#graphql
  type Menu {
    id: ID!
    name: String!
    parent: ID!
    url: String
    icon: String
    order: Int
    color: String
    status: Int
  }

  input MenuInput {
    name: String!
    parent: ID!
    url: String
    icon: String
    order: Int
    color: String
    status: Int
  }

  type Query {
    getMenu(id: ID!): Menu
    getAllMenus: [Menu!]!
    getAllSideMenus: Object
  }

  type Mutation {
    createMenu(input: MenuInput): Menu!
    updateMenu(id: ID!, input: MenuInput): Menu
    deleteMenu(id: ID!): Boolean
  }
`