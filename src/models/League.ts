import mongoose, { Model, Schema } from "mongoose";

interface ILeague {
    apiId: number;
    name: string;
    type: string;
    logo: string;
    country: mongoose.Types.ObjectId | null;
    seasons: {
        year: number;
        start: Date;
        end: Date;
        current: boolean;
        coverage: {
            fixtures: {
                events: boolean;
                lineups: boolean;
                statistics_fixtures: boolean;
                statistics_players: boolean;
            };
            standings: boolean;
            players: boolean;
            top_scorers: boolean;
            top_assists: boolean;
            top_cards: boolean;
            injuries: boolean;
            predictions: boolean;
            odds: boolean;
        }
    }[]
}

const schema = new Schema<ILeague>({
    apiId: { type: Number },
    name: { type: String, required: true },
    type: { type: String, required: true },
    logo: { type: String },
    country: { type: mongoose.Types.ObjectId, ref: 'Country', default: null },
    seasons: [{
        year: { type: Number, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        current: { type: Boolean },
        coverage: {
            fixtures: {
                events: { type: Boolean, default: false },
                lineups: { type: Boolean, default: false },
                statistics_fixtures: { type: Boolean, default: false },
                statistics_players: { type: Boolean, default: false },
            },
            standings: { type: Boolean, default: false },
            players: { type: Boolean, default: false },
            top_scorers: { type: Boolean, default: false },
            top_assists: { type: Boolean, default: false },
            top_cards: { type: Boolean, default: false },
            injuries: { type: Boolean, default: false },
            predictions: { type: Boolean, default: false },
            odds: { type: Boolean, default: false },
        }
    }]

}, { timestamps: true });

export default (mongoose.models.League || mongoose.model<ILeague>("League", schema)) as Model<ILeague>;