import bcryptjs from 'bcryptjs';
import UserSchema from '../schema/UserSchema';

interface Data {
  login: string,
  password: string,
}

class User {
  password = '';

  async create(data: Data) {
    const userInfo = {
      login: data.login,
      password: await bcryptjs.hash(data.password, 8),
    };

    const result = await UserSchema.find({ login: data.login }).exec();

    if (result.length === 0) {
      await UserSchema.create(userInfo);

      return true;
    }

    return false;
  }

  async getAll() {
    return UserSchema.find();
  }

  findOne(data: Data) {
    return UserSchema.findOne({ login: data.login }).exec();
  }

  checkPassword(password: string, hash: string) {
    return bcryptjs.compareSync(password, hash);
  }
}

export default new User();
