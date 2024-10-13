import mongoose, { Model, model, Schema } from "mongoose";

export interface Message {
    status: "pending" | "sent" | "delivered" | "read";
    via: "api" | "web" | "app" | "server";
    chatId: string;
    sender: string;
    recipient: string;
    message: string
}

const schema = new Schema<Message>({
    status: { type: String, required: true, enum: ["pending", "sent", "delivered", "read"] },
    via: { type: String, required: true, enum: ["api", "web", "app", "server"] },
    chatId: { type: String, required: true },
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

export default (mongoose.models.Message || model<Message>("Message", schema)) as Model<Message>;