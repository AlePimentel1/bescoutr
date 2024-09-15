import mongoose, { Document, Model, Schema } from "mongoose";

interface IPlayer extends Document {
    apiId: number;
    name: string;
    firstName: string;
    lastName: string;
    age: number;
    birth: {
        date: Date;
        place: string;
        country: string
    };
    nationality: string;
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
        country: { type: String, ref: 'Country' }
    },
    nationality: { type: String, ref: 'Country' },
    height: { type: String },
    weight: { type: String },
    injured: { type: Boolean, default: false },
    photo: { type: String },
}, { timestamps: true });

export default (mongoose.models.Player || mongoose.model<IPlayer>("Player", schema)) as Model<IPlayer>;