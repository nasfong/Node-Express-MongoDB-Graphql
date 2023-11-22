import { IMenuParent, MenuParent } from '../../models/MenuParent'
import { IMenu, Menu } from '../../models/Menu'
import { ResolverMap } from '../../types/graphql-utils'

export const menuResolvers: ResolverMap = {
  Query: {
    async getMenu(_, { id }: { id: number }) {
      return await Menu.findById(id)
    },
    async getAllMenus() {
      return await Menu.find()
    },
    async getAllSideMenus() {
      const result = await Menu.find().sort('order')
        .populate({
          path: 'parent',
        })
        .then((menus) => {
          const fill = menus.sort((a, b) => (a.parent as IMenuParent).order - (b.parent as IMenuParent).order).reduce((acc: { [parent: string]: IMenu[] }, obj) => {
            const parent = (obj.parent as IMenuParent).name
            const child = menus.filter((child) => {
              return (child.parent as IMenuParent).name === parent
            })
            acc[parent] = child
            return acc;
          }, {});
          return fill
        })
      return result
    }
  },
  Mutation: {
    async createMenu(_, { input }: { input: IMenu }) {
      try {
        const order = await Menu.find().count()
        const createMenu = await new Menu({
          ...input,
          order: input.order || order + 1
        }).save()
        return createMenu
      } catch (error) {
        console.log(error)
      }
    },
    async updateMenu(_, { id, input }: { id: number, input: IMenu }) {
      const menu = await Menu.findOneAndUpdate(
        { _id: id },
        { ...input },
        { new: true }
      )
      return menu
    },
    async deleteMenu(_, { id }: { id: number }) {
      const wasDelete = (await Menu.deleteOne({ _id: id })).deletedCount
      return wasDelete // 1 if something was deleted, 0if nothing deleted
    },
  }
}