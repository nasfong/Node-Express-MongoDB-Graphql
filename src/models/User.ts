import { Document, Model, model, Query, Schema, Types } from 'mongoose'

export interface ILogin { username: string, password: string }

export interface IUser {
  id?: string
  username: string
  password: string
  email?: string
  role?: [Types.ObjectId]
  createdAt?: string
}
interface IUserMethods {
  // fullName(): string;
}
interface IUserQuery {
  where(arg0: { username: RegExp }): string
  byName(name: string): string
}
interface IUserVirtual {
  namedEmail(): string
}
// interface IUserDocument extends Document { }
// type UserModel = Model<IUser, {}, IUserMethods>;
interface UserModel extends Model<IUser, IUserQuery, IUserMethods, IUserVirtual> {
  findByName(username: string): string;
}


const modelSchema = new Schema<IUser, UserModel, IUserMethods, IUserQuery>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  createdAt: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }
},
  {
    versionKey: false,
  })

modelSchema.method('fullName', function () {
  return this.username + ' ' + this.password;
});
modelSchema.static('findByName', function (name) {
  return this.find({ username: new RegExp(name, 'i') })
});
modelSchema.query.byName = function (name) {
  return this.where({ username: new RegExp(name, 'i') })
}
modelSchema.virtual('namedEmail').get(function () {
  return `${this.username} <${this.email}`
})

// modelSchema.pre('updateOne', function (this: any, next) {
//   this._oldId = this.getQuery()._id; // Save the old _id
//   next();
// });
export const User = model<IUser, UserModel>('User', modelSchema)

async function run() {
  //  console.log(create.fullName())
  // console.log(await User.findByName('NasFong'))
  // console.log(await User.find().byName('NasFong'))
  // console.log((await User.findOne({ name: 'NasFong' }))?.namedEmail)
  // const roles = { role: [{ name: 'Staff' }] }
  // console.log(roles.role.map(rol => rol.name))
  // let Permissions: any = await User.find()
  // Permissions = Permissions.map((permission: any) => ({
  //   [permission.id]: permission.username
  // }))
  // console.log(Permissions)
}
run()