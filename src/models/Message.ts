import mongoose, { Model, model, Schema } from "mongoose";

export interface Message {
    status: "pending" | "sent" | "delivered" | "read";
    via: "api" | "web" | "app" | "server";
    chatId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    receiversIds: mongoose.Types.ObjectId;
    text: string
}

const schema = new Schema<Message>({
    status: { type: String, required: true, enum: ["pending", "sent", "delivered", "read"] },
    via: { type: String, required: true, enum: ["api", "web", "app", "server"] },
    chatId: { type: Schema.Types.ObjectId, required: true, ref: "Chat" },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    receiversIds: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    text: { type: String, required: true }
}, { timestamps: true });

export default (mongoose.models.Message || model<Message>("Message", schema)) as Model<Message>;