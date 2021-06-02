import 'dotenv/config';

export default {
  secretKey: process.env.JWT_SECRET,
  expiresIn: '7d',
};
