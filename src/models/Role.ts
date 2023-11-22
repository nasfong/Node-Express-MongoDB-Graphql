import { Document, model, Schema, Types } from 'mongoose'

export interface IRole {
  id?: number
  name: string
  permission: [Types.ObjectId]
  user: [Types.ObjectId]
}

// interface IUserDocument extends Document { }

const modelSchema: Schema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permission: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Permission',
    default: []
  },
  // user: {
  //   type: [Schema.Types.ObjectId],
  //   required: true,
  //   ref: 'User',
  //   default: []
  // },
}, { versionKey: false })


export const Role = model<IRole>('Role', modelSchema)
