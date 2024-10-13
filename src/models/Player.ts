import mongoose, { Model, Schema } from "mongoose";

interface IPlayer {
    apiId: number;
    name: string;
    firstName: string;
    lastName: string;
    age: number;
    birth: {
        date: Date;
        place: string;
        country: mongoose.Types.ObjectId | null;
    };
    nationality: mongoose.Types.ObjectId | null;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
}

const schema = new Schema<IPlayer>({
    apiId: { type: Number, required: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    birth: {
        date: { type: Date },
        place: { type: String },
        country: { type: mongoose.Types.ObjectId, ref: 'Country', default: null },
    },
    nationality: { type: mongoose.Types.ObjectId, ref: 'Country', default: null },
    height: { type: String },
    weight: { type: String },
    injured: { type: Boolean, default: false },
    photo: { type: String },
}, { timestamps: true });

export default (mongoose.models.Player || mongoose.model<IPlayer>("Player", schema)) as Model<IPlayer>;