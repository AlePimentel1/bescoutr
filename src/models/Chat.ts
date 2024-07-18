import mongoose, { Document, Model, Schema } from "mongoose";

interface IChat extends Document {
    members: string[];
    messages: string[];
    isGroup?: boolean;
    name?: string;
    groupPhoto?: string;
    lastMessage?: Date;
}

interface IChatMethods {
    addMessage: (message: string) => void;
    addMember: (member: string) => void;
}

type ChatModel = Model<IDBVersionChangeEvent, {}, IChatMethods>;

const schema = new Schema<IChat, ChatModel, IChatMethods>({
    members: [{ type: String }],
    messages: [{ type: String }],
    isGroup: { type: Boolean, default: false },
    name: { type: String },
    groupPhoto: { type: String },
    lastMessage: { type: Date },
}, { timestamps: true });

schema.method("addMessage", function (message: string) {
    this.messages.push(message);
});

schema.method("addMember", function (member: string) {
    this.members.push(member);
})

export default (mongoose.models.Chat || mongoose.model<IChat, ChatModel>("Chat", schema)) as Model<IChat, {}, IChatMethods>;