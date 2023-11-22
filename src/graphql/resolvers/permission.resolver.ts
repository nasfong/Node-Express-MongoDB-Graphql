import { Role } from "../../models/Role"
import { IPermission, Permission } from "../../models/Permission"

export const permissionResolver = {
  Query: {
    async getPermission(_: unknown, { id }: { id: number }) {
      return await Permission
        .findById(id)
        .populate('role')
    },
    async getAllPermissions(_: unknown, { amount }: { amount: number }) {
      return await Permission
        .find()
        .sort({ createdAt: -1 })
        .limit(amount)
        .populate('role')
    },
    async getPermissionDropdown() {
      const permissions = await Permission.find()
      return permissions.reduce((json: any, value, index) => {
        json[value.id] = value.name;
        return json
      }, {})
    }
  },
  Mutation: {
    async createPermission(_: unknown, { input }: { input: IPermission }) {
      const create = await new Permission<IPermission>({
        ...input
      }).save()
      await Role.updateMany(
        { _id: { $in: input.role } },
        { $addToSet: { permission: [create.id] } },
        { multi: true }
      )

      return create.populate({ path: 'role' })
    },
    async updatePermission(_: unknown, { id, input }: { id: number, input: IPermission }) {
      await Permission.findById(id).then(async (result) => {
        await Role.updateMany(
          { _id: { $in: result?.role } },
          { $pull: { permission: id } },
          { multi: true }
        )
      })

      await Role.updateMany(
        { _id: { $in: input.role } },
        { $addToSet: { permission: id } },
        { multi: true }
      )

      const update = await Permission
        .findOneAndUpdate(
          { _id: id },
          { ...input },
          { new: true }
        )



      return update?.populate('role')
    },
    async deletePermission(_: unknown, { id }: { id: number }) {
      const wasDelete = (await Permission.deleteOne({ _id: id })).deletedCount
      return wasDelete // 1 if something was deleted, 0if nothing deleted
    },
  }
}