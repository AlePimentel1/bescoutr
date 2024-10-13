import mongoose, { Document, Model, Schema } from "mongoose";

interface ICountry {
    name: string;
    code: string;
    flag: string;
}

const schema = new Schema<ICountry>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    flag: { type: String, required: true }
}, { timestamps: true });

export default (mongoose.models.Country || mongoose.model<ICountry>("Country", schema)) as Model<ICountry>;