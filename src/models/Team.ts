import mongoose, { Model, Schema } from "mongoose";

interface ITeam {
    apiId: number;
    name: string;
    code: string;
    country: mongoose.Types.ObjectId | null;
    national: boolean;
    logo: string;
}

const schema = new Schema<ITeam>({
    apiId: { type: Number, required: true },
    name: { type: String, required: true },
    code: { type: String, default: "" },
    country: { type: mongoose.Types.ObjectId, ref: 'Country', default: null },
    national: { type: Boolean, required: true, default: false },
    logo: { type: String, required: true }
}, { timestamps: true });

export default (mongoose.models.Team || mongoose.model<ITeam>("Team", schema)) as Model<ITeam>;