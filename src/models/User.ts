import mongoose from "mongoose";
import bcrypt from 'bcrypt';

interface IUser {
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    active?: boolean;
    verificationToken?: string | mongoose.Types.ObjectId
}


const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    verificationToken: { type: mongoose.Schema.Types.ObjectId, ref: 'VerificationToken' }
}, { timestamps: true });

UserSchema.index({ email: 1, username: 1 }, { unique: true });

UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compareSync(password, this.hash_password);
};

export default (mongoose.models.User || mongoose.model<IUser>('User', UserSchema)) as mongoose.Model<IUser>;