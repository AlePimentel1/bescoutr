import mongoose, { Model } from "mongoose";

const baseOptions = {
    discriminatorKey: "type",
    timestamps: true,
}

export interface IInteractionBase {
    type: string;
    via: "api" | "web" | "app" | "server";
    status: "pending" | "completed" | "failed";
    user: string | mongoose.Types.ObjectId;
    content: {};
    createdAt?: Date;
    updatedAt?: Date;
}

export const InteractionBaseSchema = new mongoose.Schema<IInteractionBase>({
    type: { type: String, required: true },
    via: { type: String, required: true, enum: ["api", "web", "app", "server"] },
    status: { type: String, required: true, enum: ["pending", "completed", "failed"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
}, { ...baseOptions });

const Interaction = (mongoose.models.Interaction || mongoose.model("Interaction", InteractionBaseSchema)) as Model<IInteractionBase>

export interface IChatMessage extends IInteractionBase {
    content: {
        message: string;
    }
}

export interface ChatMessageDocument extends IChatMessage, mongoose.Document { }
export interface ChatMessageModel extends Model<ChatMessageDocument> { }

export const ChatMessage = Interaction.discriminators?.chatMessage ?? Interaction.discriminator<ChatMessageDocument, ChatMessageModel>("chatMessage", new mongoose.Schema<ChatMessageDocument>({
    content: {
        message: { type: String, required: true },
    }
}, { ...baseOptions }));

export default Interaction;