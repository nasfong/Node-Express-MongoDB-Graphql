import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import mongoose from 'mongoose'
import Logging from './helpers/Logging'
import { typeDefs, resolvers } from './graphql/index';
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { existsSync, mkdirSync } from 'fs'
import { startStandaloneServer } from '@apollo/server/standalone'
import context from './middleware/context'
// Create Folder public/uploads
if (!existsSync('public/uploads')) mkdirSync('public/uploads', { recursive: true })

dotenv.config()
// const app = express()
const port = process.env.PORT || 5000
const MONGO_DB = process.env.MONGO_DB as string

mongoose.set("strictQuery", true)
mongoose
  .connect(MONGO_DB,
    {
      retryWrites: true,
      w: 'majority'
    }
  )
  .then(() => {
    Logging.info('Mongo connected successfully.');
    // nodeServer()
  })
  .catch((error) => Logging.error(error))



const nodeServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }) as any,
    ],
  });
  // await server.start();
  await startStandaloneServer(server, {
    listen: { port: 5000 },
    context: context
  }).then((({ url }) => Logging.info(`🚀 Graphql ready at ${url}graphql`)))


}
nodeServer()
