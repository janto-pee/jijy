import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  console.log('password...', password);
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(password, salt);
  password = hash;
  return password;
}

export async function comparePassword(password: string, hash: any) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (_) {
    return false;
  }
}
