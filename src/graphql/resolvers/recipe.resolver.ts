import { formatYupError } from '../../helpers/formatYubError';
import { IRecipe, Recipe as Model } from '../../models/Recipe'
import { ResolverMap } from '../../types/graphql-utils';
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().min(3).max(10),
  description: yup.string().min(3).max(10),
  thumbsUp: yup.number().min(3).max(10)
})

export const recipeResolvers: ResolverMap = {
  Query: {
    async recipe(_, { id }: { id: number }) {
      return await Model.findById(id)
    },
    async recipes(_, { amount }: { amount: number }) {
      return await Model.find().sort({ createdAt: -1 }).limit(amount)
    }
  },
  Mutation: {
    async createRecipe(_, args) {
      const { input: { name, description, thumbsDown, thumbsUp } } = args
      // try {
      //   await schema.validate({ name, description, thumbsDown, thumbsUp }, { abortEarly: false })
      // } catch (err: any) {
      //   return { error: formatYupError(err) }
      // }
      try {
        return await new Model<IRecipe>({
          name: name,
          description: description,
          createdAt: new Date().toString(),
          thumbsUp: thumbsUp || 0,
          thumbsDown: thumbsDown || 0
        })
          .save()
          .then((data) => ({ data: data }))
          .catch((err) => {
            console.log(err.name)
            console.log(err.message)
            console.log(err.path)
            console.log(err)
            return {
              error: err.message
              //  {
              //   name: err.errors.name.message
              // }
            }
          })

      } catch (error: any) {
        // console.log(error)
        return {
          error: [{
            path: 'err',
            message: String(error)
          }]
        }
      }

      // const res = await createRecipe.save() // MongoDB Saving
      // return {
      //   id: res.id,
      //   ...res._doc
      // }

    },
    async updateRecipe(_, { id, input: { name, description } }: { id: number, input: IRecipe }) {
      const wasEdited = (await Model.updateOne({ _id: id }, { name: name, description: description })).modifiedCount
      return wasEdited // 1 if something was edited, 0if nothing edited
    },
    async deleteRecipe(_, { id }: { id: number }) {
      const wasDelete = (await Model.deleteOne({ _id: id })).deletedCount
      return wasDelete // 1 if something was deleted, 0if nothing deleted
    },
  }
}