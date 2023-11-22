import { recipeResolvers } from './resolvers/recipe.resolver';
import { readFileSync } from 'fs'
import path from 'path'
import { userResolver } from './resolvers/user.resolver';
import { uploadResolver } from './resolvers/upload.resolver';
import { permissionGraphql } from './typeDefs/permission.graphql';
import { permissionResolver } from './resolvers/permission.resolver';
import { roleGraphql } from './typeDefs/role.graphql';
import { roleResolver } from './resolvers/role.resolver';
import { userGraphql } from './typeDefs/user.graphql';
import { menuGraphql } from './typeDefs/menu.graphql';
import { menuResolvers } from './resolvers/menu.resolver';
import { menuParentResolvers } from './resolvers/menuParent.resolver';
import { menuParentGraphql } from './typeDefs/menuParent.graphql';
import { customerGraphql } from './typeDefs/customer.graphql';
import { customerResolver } from './resolvers/customer.resolver';

//function that imports .graphql files
const importGraphQL = (file: string) => {
  return readFileSync(path.join(__dirname, file), "utf-8");
}

const recipeTypeDefs = importGraphQL('./typeDefs/recipe.graphql')
const uploadTypeDefs = importGraphQL('./typeDefs/upload.graphql')

export const typeDefs = `
  ${recipeTypeDefs}
  ${userGraphql}
  ${uploadTypeDefs}
  ${permissionGraphql}
  ${roleGraphql}
  ${menuGraphql}
  ${menuParentGraphql}
  ${customerGraphql}
`

export const resolvers = {
  Upload: {
    ...uploadResolver.Upload
  },
  Query: {
    ...menuResolvers.Query,
    ...recipeResolvers.Query,
    ...userResolver.Query,
    ...uploadResolver.Query,
    ...permissionResolver.Query,
    ...roleResolver.Query,
    ...menuParentResolvers.Query,
    ...customerResolver.Query,
  },
  Mutation: {
    ...menuResolvers.Mutation,
    ...recipeResolvers.Mutation,
    ...userResolver.Mutation,
    ...uploadResolver.Mutation,
    ...permissionResolver.Mutation,
    ...roleResolver.Mutation,
    ...menuParentResolvers.Mutation,
    ...customerResolver.Mutation,
  }
}