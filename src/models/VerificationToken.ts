import mongoose from "mongoose";

export interface VerificationToken {
    token: string;
    activatedAt?: Date;
    user: mongoose.Types.ObjectId;
}

const VerificationTokenSchema = new mongoose.Schema<VerificationToken>({
    token: { type: String, required: true },
    activatedAt: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default (mongoose.models.VerificationToken || mongoose.model<VerificationToken>('VerificationToken', VerificationTokenSchema)) as mongoose.Model<VerificationToken>;