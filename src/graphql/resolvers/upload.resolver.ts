import path from 'path'
import fs from 'fs';
import { GraphQLUpload } from 'graphql-upload-ts'
import { finished } from 'stream/promises';
import { createFile } from '../../helpers/createFile';
import { IUpload, Upload } from '../../models/Upload';


export const uploadResolver = {
  Upload: GraphQLUpload,
  Query: {
    uploads: async () => {
      return await Upload.find()
    },
  },
  Mutation: {
    singleUpload: async (_: unknown, { file }: any) => {
      const { createReadStream, filename, mimetype, encoding } = await file
      const url = await createFile({ createReadStream, filename })

      const createImage = new Upload<IUpload>({
        image: url
      })
      return await createImage.save()
    },
    deleteUpload: async (_: unknown, { id }: { id: number }) => {

      const url = `${process.env.BASE_URL}:${process.env.PORT}/uploads/`
      return await Upload.findByIdAndDelete(id)
        .then(img => {
          const image = img && img.image.replace(url, "") || ''
          fs.unlinkSync(`public/uploads/${image}`)
          return true
        })
        .catch(error => console.log(error))
    }
  }
}