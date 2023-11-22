import { model, Schema, Types } from 'mongoose'
import { IMenuParent } from './MenuParent'

export interface IMenu {
  name: string
  parent: Types.ObjectId | IMenuParent
  url?: string
  icon?: string
  order?: number
  color?: string
  status: number
}

const modelSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true, unique: true },
    parent: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'MenuParent'
    },
    url: String,
    icon: String,
    order: { type: Number, required: true, unique: true },
    color: String,
    status: { type: Number, default: 0 }
  },
  {
    versionKey: false,
  }
)

export const Menu = model('Menu', modelSchema)