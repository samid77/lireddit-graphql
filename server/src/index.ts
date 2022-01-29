import 'reflect-metadata';
import {MikroORM} from "@mikro-orm/core";
// import {Post} from './entities/Post';
import microConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql'

import {PostResolver} from './resolvers/post'
import {UserResolver} from './resolvers/user'
import { HelloResolver } from './resolvers/hello';
import {MyContext} from './types';
import { __prod__ } from './constants';
const { createClient } = require('redis')
const session = require('express-session')


const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const post = orm.em.create(Post, {title: 'Second Post 19.03'});
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(`posts: ${JSON.stringify(posts, undefined, 2)}`);

  const app = express();

  let RedisStore = require('connect-redis')(session)
  let redisClient = createClient()

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ 
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__
      },
      saveUninitialized: false,
      secret: 'rahasia',
      resave: false,
    })
  )


  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver, HelloResolver],
      validate: false,
    }),
    context: ({req, res}): MyContext => ({em: orm.em, req, res})
  });

  apolloServer.applyMiddleware({app});
  
  app.listen(4000, () => {
    console.log(`Server started at port 4000...`)
  })
}

main().catch(err => {
  console.error(err);
});

