import mongoose, { Model, Schema } from "mongoose";

export interface Chat {
    members: mongoose.Types.ObjectId[];
    isGroup?: boolean;
    groupName?: string;
    groupPhoto?: string;
    lastMessage?: mongoose.Types.ObjectId;
}

interface IChatMethods {
    addMember: (member: string) => void;
}

type ChatModel = Model<IDBVersionChangeEvent, {}, IChatMethods>;

const schema = new Schema<Chat, ChatModel, IChatMethods>({
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },
    groupPhoto: { type: String },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
}, { timestamps: true });

schema.method("addMember", function (memberId: mongoose.Types.ObjectId) {
    if (!this.members.includes(memberId)) {
        this.members.push(memberId);
    } else {
        throw new Error("User already in chat");
    }
});

export default (mongoose.models.Chat || mongoose.model<Chat, ChatModel>("Chat", schema)) as Model<Chat, {}, IChatMethods>;