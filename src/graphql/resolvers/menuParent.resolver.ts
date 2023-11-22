import { IMenuParent, MenuParent } from '../../models/MenuParent'

export const menuParentResolvers = {
  Query: {
    async getMenuParent(_: unknown, { id }: { id: number }) {
      return await MenuParent.findById(id)
    },
    async getAllMenuParents() {
      return await MenuParent.find()
    },
  },
  Mutation: {
    async createMenuParent(_: unknown, { input }: { input: IMenuParent }) {
      const order = await MenuParent.find().count()
      const createMenuParent = await new MenuParent({
        ...input,
        order: order + 1
      }).save()
      return createMenuParent
    },
    async updateMenuParent(_: unknown, { id, input }: { id: number, input: IMenuParent }) {
      const menuParent = await MenuParent.findOneAndUpdate(
        { _id: id },
        { ...input },
        { new: true }
      )
      return menuParent
    },
    async deleteMenuParent(_: unknown, { id }: { id: number }) {
      const wasDelete = (await MenuParent.deleteOne({ _id: id })).deletedCount
      return wasDelete // 1 if something was deleted, 0if nothing deleted
    },
  }
}