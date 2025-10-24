import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});
const User = model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map