// import { IPermission } from '../../models/Permission';
import { tokenSign } from '../../helpers/tokenMiddleware';
import { Role } from '../../models/Role';
import { ILogin, IUser, User } from '../../models/User'
import jwt from 'jsonwebtoken';


export const userResolver = {
  Query: {
    async getUser(_: unknown, { id }: { id: number }) {
      const user = await User
        .findById(id)
        .populate({
          path: 'role',
        })
      return user
    },
    async getAllUsers(_: unknown, { search, page = 1, limit = 10 }: any, b: unknown, c: unknown,) {
      // console.log(b)
      const skip = (page - 1) * limit
      const escapedSearch = search?.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      const query = search
        ? {
          $or: [
            { username: new RegExp(escapedSearch, 'i') },
            { email: new RegExp(escapedSearch, 'i') }
          ]
        } : {}
      const users = await User.find(query)
        .populate({
          path: 'role',
        })
        .skip(skip)
        .limit(limit)

      const totalBooksCount = await User.countDocuments(query);
      const totalPages = Math.ceil(totalBooksCount / limit);
      return { users, totalPages }
    },
  },
  Mutation: {
    async login(_: unknown, { input }: { input: ILogin }, a: any, b: any) {
      const user = await User
        .findOne({ username: input.username })
        .populate({
          path: 'role',
          populate: 'permission'
        })
        .then((data: any) => {
          const permission = data?.role?.permission.map(({ name }: any) => name)
          console.log(permission)
          return {
            ...data?._doc,
            permission: permission
          }
        })
      return { token: tokenSign(user) }
    },
    async createUser(_: unknown, { input }: { input: IUser }) {
      const create = await new User<IUser>({
        ...input,
        createdAt: new Date().toISOString()
      }).save()

      await Role.updateMany(
        { _id: { $in: input.role } },
        { $addToSet: { role: [create.id] } },
        { multi: true }
      )

      return create.populate('role')
    },
    async updateUser(_: unknown, { id, input }: { id: number, input: IUser }) {

      await User.findById(id).then(async (result) => {
        await Role.updateOne(
          { _id: result?.role },
          { $pull: { user: id } },
        )
      })
      await Role.updateOne(
        { _id: input.role },
        { $addToSet: { user: id } },
      )


      const user = await User
        .findOneAndUpdate({ _id: id }, { ...input }, { new: true })
        .populate('role')
      // .exec()
      // .then((data: any) => {
      //   const token = jwt.sign(
      //     { username: data?.username, password: data?.password },
      //     process.env.JWT_PRIVATE_KEY as string,
      //     { expiresIn: process.env.TOKEN_EXPIRY_TIME }
      //   )
      //   return ({
      //     id: data?._id,
      //     ...data._doc,
      //     token: token
      //   })
      // })




      return user
    },
    async deleteUser(_: any, { id }: { id: number }) {
      // const user = await User.findById(id).then(async (user) => {
      //   console.log(user)
      //   // if (user?.permission?.length) return 'Cannot delete [permission]'
      //   if (user?.role?.length) return 'Cannot delete [user]'
      //   const wasDelete = (await User.deleteOne({ _id: id }).lean()).deletedCount
      //   return wasDelete ? 'Delete Successful' : 'Not Found'
      // })
      // return user
      const wasDelete = (await User.deleteOne({ _id: id }).lean()).deletedCount
      return wasDelete // 1 if something was deleted, 0if nothing deleted
    },
  }
}