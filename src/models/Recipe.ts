import { model, Schema } from 'mongoose'

export interface IRecipe {
  name: string
  description?: string
  createdAt?: string
  thumbsUp?: number
  thumbsDown?: number
}

const modelSchema = new Schema<IRecipe>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: String,
  thumbsUp: Number,
  thumbsDown: Number,
})

export const Recipe = model('Recipe', modelSchema)