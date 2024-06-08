import mongoose from "mongoose";
import bcrypt from 'bcrypt';

interface IUser {
    _id?: string | mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
}


const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

UserSchema.index({ email: 1, username: 1 }, { unique: true });

UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compareSync(password, this.hash_password);
};

export default (mongoose.models.User || mongoose.model<IUser>('User', UserSchema)) as mongoose.Model<IUser>;