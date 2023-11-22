import { Document, model, Schema, Types } from 'mongoose'


export interface IUpload {
  image: string
}

// interface IUploadDocument extends Document { }

const modelSchema: Schema = new Schema<IUpload>(
  {
    image: { type: String, required: true, unique: true },
  },
  { timestamps: true,versionKey: false, }
)

export const Upload = model<IUpload>('Upload', modelSchema)
