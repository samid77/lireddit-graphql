import {Resolver, Mutation, Arg, InputType, Field, Ctx, ObjectType} from 'type-graphql';
import {MyContext} from '../types';
import argon2 from 'argon2';
import {User} from '../entities/User';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(() => User, {nullable: true})
  user?: User
}

@Resolver()
export class UserResolver {

  @Mutation(() => UserResponse)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() {em} : MyContext
  ): Promise<UserResponse> {
    if(options.username.length <= 2) {
      return {
        errors: [{
          field: 'username',
          message: 'Username must be at least 2 characters'
        }]
      }
    }

    if(options.password.length <= 3) {
      return {
        errors: [{
          field: 'password',
          message: 'Password must be at least 3 characters'
        }]
      }
    }
    const hashedPassword = await argon2.hash(options.password)
    const user = em.create(User, {username: options.username, password: hashedPassword})
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if(error.code === '23505' || error.detail.includes("already exists")){
        console.error(`Duplicate user`)
        return {
          errors:[
            {
              field: 'username',
              message: `Username already exists`
            }
          ]
        }
      }
      console.error(`error message: ${error.message}`);
    }
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() {em} : MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {username: options.username});
    if(!user) {
      return {
        errors: [{
          field: 'username',
          message: 'Username does not exist'
        }]
      };
    }
    const valid = await argon2.verify(user.password, options.password)
    if(!valid) {
      return { 
        errors: [{
          field: 'password',
          message: 'Incorrect password'
        }]
      }
    }

    // req.session!.userId = user.id;

    return {
      user,
    };
  }
}