import { model, Schema, Types } from 'mongoose'

export interface IMenuParent {
  name: string
  order: number
}

const modelSchema = new Schema<IMenuParent>(
  {
    name: { type: String, required: true, unique: true },
    order: { type: Number, required: true, unique: true }
  },
  {
    versionKey: false,
  }
)

export const MenuParent = model('MenuParent', modelSchema)