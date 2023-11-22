import { RowDataPacket } from 'mysql2'
import { pool } from '../../config/database'
import { ResolverMap } from '../../types/graphql-utils'

export const customerResolver: ResolverMap = {
  Query: {
    async getAllCustomers() {
      try {
        const [result] = await pool.query('SELECT * FROM customer')
        return result
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    async createCustomer(_, { input }: { input: any }) {
      const { userId, name, age, phone } = input
      try {
        const [result] = await pool.execute(
          'INSERT INTO customer (userId, name, age, phone) VALUES (?, ?, ?, ?)',
          [userId, name, age, phone]
        )
        return { data: (result as RowDataPacket).insertId }
      } catch (error) {
        return { error }
      }
    }
  }
}