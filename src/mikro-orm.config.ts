import {__prod__} from './constants';
import {Post} from './entities/Post';
import {User} from './entities/User';
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: 'lireddit3',
  type: 'postgresql',
  user: 'lireddituser',
  password: 'lireddituser',
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];