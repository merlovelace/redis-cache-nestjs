import * as process from 'process';
import * as jwt from 'jsonwebtoken';

const createToken = async (data) => {
  const token = jwt.sign(data, process.env.SECRET, { expiresIn:  process.env.EXPIRED });
  return token
};

const checkToken = async (data) => {
  const user = jwt.verify(data, process.env.SECRET);
  return user
};

export { createToken, checkToken };

