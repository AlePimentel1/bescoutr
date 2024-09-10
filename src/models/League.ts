import mongoose, { Document, Model, Schema } from "mongoose";

interface ILeague extends Document {
    apiId: number;
    name: string;
    type: string;
    logo: string;
    country: string;
    season: {
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
    }
}

const schema = new Schema<ILeague>({
    apiId: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    logo: { type: String, required: true },
    country: { type: String, required: true, ref: 'Country' },
    season: {
        year: { type: Number, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        current: { type: Boolean, required: true },
        coverage: {
            fixtures: {
                events: { type: Boolean, required: true },
                lineups: { type: Boolean, required: true },
                statistics_fixtures: { type: Boolean, required: true },
                statistics_players: { type: Boolean, required: true },
            },
            standings: { type: Boolean, required: true },
            players: { type: Boolean, required: true },
            top_scorers: { type: Boolean, required: true },
            top_assists: { type: Boolean, required: true },
            top_cards: { type: Boolean, required: true },
            injuries: { type: Boolean, required: true },
            predictions: { type: Boolean, required: true },
            odds: { type: Boolean, required: true },
        }
    }

}, { timestamps: true });

export default (mongoose.models.League || mongoose.model<ILeague>("League", schema)) as Model<ILeague>;