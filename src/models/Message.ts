import mongoose, { Document, Model, model, Schema } from "mongoose";

interface IMessage extends Document {
    status: "pending" | "sent" | "delivered" | "read";
    via: "api" | "web" | "app" | "server";
    chatId: string;
    sender: string;
    recipient: string;
    message: string
}

const schema = new Schema<IMessage>({
    status: { type: String, required: true, enum: ["pending", "sent", "delivered", "read"] },
    via: { type: String, required: true, enum: ["api", "web", "app", "server"] },
    chatId: { type: String, required: true },
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

export default (mongoose.models.Message || model<IMessage>("Message", schema)) as Model<IMessage>;