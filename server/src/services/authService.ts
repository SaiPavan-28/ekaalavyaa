import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export const register = async (data: any) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const passwordHash = await hashPassword(data.password);
  
  const user = new User({
    ...data,
    passwordHash
  });

  await user.save();
  
  // Strip password Hash
  const userObject = user.toObject();
  delete userObject.passwordHash;
  
  return userObject;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('INVALID_CREDENTIALS');
  
  if (!user.isActive) throw new Error('USER_INACTIVE');

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) throw new Error('INVALID_CREDENTIALS');

  const token = generateToken({ userId: user._id, role: user.role });
  
  const userObject = user.toObject();
  delete userObject.passwordHash;

  return { user: userObject, token };
};

export const getMe = async (userId: string) => {
  const user = await User.findById(userId).select('-passwordHash');
  if (!user) throw new Error('USER_NOT_FOUND');
  return user;
};
