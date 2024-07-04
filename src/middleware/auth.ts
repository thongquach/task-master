import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';

// extends the default Express Request interface to include additional properties user and token
export interface CustomRequest extends Request {
  user?: IUser;
  token?: string;
}

// specifies the structure of the decoded JWT token, containing the _id field representing the user's unique identifier
interface DecodedToken {
  _id: string;
}

// TODO: validate user input
// TODO: handle token expiration
const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    if (!token) {
      throw new Error('Authentication failed. Token missing.');
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken;
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Authentication failed. User not found.');
    }

    // attaches the authenticated user and token to the request object (req.user and req.token), making them available to subsequent middleware functions
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed.' });
  }
};

export default authMiddleware;
