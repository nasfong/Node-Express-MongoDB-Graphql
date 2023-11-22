import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { tokenDecode } from '../helpers/tokenMiddleware';

const getUser = async (token: any) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const context = async ({ req, res }: StandaloneServerContextFunctionArgument | any) => {
  //   console.log(req.body .operationName);
  if (req.body.operationName === 'IntrospectionQuery') {
    // console.log('blocking introspection query..');
    return {};
  }
  // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
  if (
    req.body.operationName === 'updateUser' ||
    req.body.operationName === 'createUser' ||
    req.body.operationName === 'login'
  ) {
    return {};
  }

  // get the user token from the headers
  const token = req.headers?.authorization?.split(' ')[1]

  // try to retrieve a user with the token
  const user = await tokenDecode(token);

  if (!user) {
    throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
  }

  // add the user to the context
  return { user };
};

export default context;