import mongoose from 'mongoose';

interface IUse extends mongoose.Document {
  password: string,
  login: string
}

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUse>('user', UserSchema);
