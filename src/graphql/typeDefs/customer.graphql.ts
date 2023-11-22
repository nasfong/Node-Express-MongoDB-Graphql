export const customerGraphql = `#graphql
  type Customer {
    id: Int
    userId: Int
    name: String
    age: Int
    phone: String
  }
  type CreateCustomer {
    data: Int
    error: Object
  }


  type Query {
    getAllCustomers: [Customer]
  }
  type Mutation {
    createCustomer(input: Object): CreateCustomer
  }
` 