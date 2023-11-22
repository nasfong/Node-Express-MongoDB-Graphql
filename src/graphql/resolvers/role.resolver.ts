import { User } from "../../models/User"
import { Permission } from "../../models/Permission"
import { IRole, Role } from "../../models/Role"

export const roleResolver = {
  Query: {
    async getRole(_: unknown, { id }: { id: number }) {
      return await Role.findById(id)
        .populate('permission')
    },
    async getAllRoles(_: unknown, { amount }: { amount: number }) {

      return await Role.find()
        .sort({ createdAt: -1 })
        .limit(amount)
        .populate({ path: 'permission' })
    },
    async getRoleDropdown() {
      // let roles = await Role.find()
      // return roles.map((role) => ({
      //   [role.id]: role.name
      // }))
      const roles = await Role.find()
      return roles.reduce((json: any, value, index) => {
        json[value.id] = value.name;
        return json
      }, {})
    }
  },
  Mutation: {
    async createRole(_: unknown, { input }: { input: IRole }) {
      const create = await new Role<IRole>({
        ...input
      }).save()

      await Permission.updateMany(
        { _id: { $in: input.permission } },
        { $addToSet: { role: [create.id] } },
        { multi: true }
      )

      // await User.updateMany(
      //   { _id: { $in: input.user } },
      //   { $addToSet: { role: [create.id] } },
      //   { multi: true }
      // )

      return create.populate('permission')
    },
    async updateRole(_: unknown, { id, input }: { id: number, input: IRole }) {

      await Role.findById(id).then(async (result) => {
        await Permission.updateMany(
          { _id: { $in: result?.permission } },
          { $pull: { role: id } },
          { multi: true }
        )

        // await User.updateMany(
        //   { _id: { $in: result?.user } },
        //   { $addToSet: { role: id } },
        //   { multi: true }
        // )
      })

      await Permission.updateMany(
        { _id: { $in: input.permission } },
        { $addToSet: { role: id } },
        { multi: true }
      )

      // await User.updateMany(
      //   { _id: { $in: input.user } },
      //   { $addToSet: { role: id } },
      //   { multi: true }
      // )
      const update = (await Role.findOneAndUpdate({ _id: id }, { ...input }, { new: true }))

      return update?.populate('permission')
    },
    async deleteRole(_: unknown, { id }: { id: number }) {
      // const role = await Role.findById(id).then(async (role) => {
      //   console.log(role)
      //   if (role?.permission.length) return 'Cannot delete [permission]'
      //   if (role?.user.length) return 'Cannot delete [role]'
      //   const wasDelete = (await Role.deleteOne({ _id: id }).lean()).deletedCount
      //   return wasDelete ? 'Delete Successful' : 'Not Found'
      // })
      // return role
      const wasDelete = (await Role.deleteOne({ _id: id }).lean()).deletedCount
      return wasDelete // 1 if something was deleted, 0if nothing deleted
    },
  }
}