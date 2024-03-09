import { hash, compare } from 'bcrypt';
const saltRounds = 12;
const createHash = async originalText => {

  return await hash(originalText, saltRounds);
}

const compareHash = async (originalText, hashText) => {
  return await compare(originalText, hashText);
}

export { createHash, compareHash };
