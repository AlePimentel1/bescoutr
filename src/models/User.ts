import mongoose, { Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    active?: boolean;
    verificationToken?: string | mongoose.Types.ObjectId
    following: string[];
    followers: string[];
    chats: string[];
    accountType: 'scout' | 'fan';
    favouriteTeams: string[];
    favouriteLeagues: string[];
    profilePicture?: string;
    firstName?: string;
    lastName?: string;
    isComplete: boolean;
}


export const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    verificationToken: { type: mongoose.Schema.Types.ObjectId, ref: 'VerificationToken' },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', default: [] }],
    accountType: { type: String, enum: ['scout', 'fan'], required: true },
    favouriteTeams: [{ type: String, default: [] }],
    favouriteLeagues: [{ type: String, default: [] }],
    profilePicture: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    isComplete: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.index({ email: 1, username: 1 }, { unique: true });

UserSchema.method('comparePassword', function (password: string) {
    return bcrypt.compareSync(password, this.password);
});

export default (mongoose.models.User || mongoose.model<IUser>('User', UserSchema)) as mongoose.Model<IUser>;