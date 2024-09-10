import mongoose, { Document, Model, Schema } from "mongoose";

interface ITeam extends Document {
    apiId: number;
    name: string;
    code: string;
    country: string;
    national: boolean;
    logo: string;
}

const schema = new Schema<ITeam>({
    apiId: { type: Number, required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    country: { type: String, required: true, ref: 'Country' },
    national: { type: Boolean, required: true },
    logo: { type: String, required: true }
}, { timestamps: true });

export default (mongoose.models.Team || mongoose.model<ITeam>("Team", schema)) as Model<ITeam>;