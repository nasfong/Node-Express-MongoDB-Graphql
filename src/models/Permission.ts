import { Document, model, Schema, Types } from 'mongoose'

export interface IPermission {
  name: string
  role: [Types.ObjectId]
  group: [Types.ObjectId]
  key_name: string
}

// interface IUserDocument extends Document { }

const modelSchema: Schema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  role: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Role',
    default: []
  },
}, {
  versionKey: false,
})


export const Permission = model<IPermission>('Permission', modelSchema)
