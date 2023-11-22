import { parse, join } from "path"
import { createWriteStream } from "fs"
import { finished } from 'stream/promises'

export async function createFile({ createReadStream, filename }: any) {

  const stream = createReadStream()
  var { ext, name } = parse(filename) // ? ext: '.jpg, .png, ... | name
  const random = `single${Math.floor((Math.random() * 10000) + 1)}`
  const out = createWriteStream(`public/uploads/${random}-${name}${ext}`);
  stream.pipe(out);
  await finished(out);
  return `${process.env.BASE_URL}:${process.env.PORT}/uploads/${random}-${name}${ext}`
} // This is single readFile
