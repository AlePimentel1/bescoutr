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
    statistics: {
        team: string;
        league: {
            id: string;
            season: number;
        };
        games: {
            appearences: number;
            lineups: number;
            minutes: number;
            number: number;
            position: string;
            rating: number;
            captain: boolean;
        };
        substitutes: {
            in: number;
            out: number;
            bench: number;
        };
        shots: {
            total: number;
            on: number;
        };
        goals: {
            total: number;
            conceded: number;
            assists: number;
            saves: number;
        };
        passes: {
            total: number;
            key: number;
            accuracy: number;
        };
        tackles: {
            total: number;
            blocks: number;
            interceptions: number;
        };
        duels: {
            total: number;
            won: number;
        };
        dribbles: {
            attempts: number;
            success: number;
            past: number;
        };
        fouls: {
            drawn: number;
            committed: number;
        };
        cards: {
            yellow: number;
            yellowred: number;
            red: number;
        };
        penalty: {
            won: number;
            commited: number;
            scored: number;
            missed: number;
            saved: number;
        };
    }[]
}

const schema = new Schema<IPlayer>({
    apiId: { type: Number, required: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    birth: {
        date: { type: Date, required: true },
        place: { type: String, required: true },
        country: { type: String, required: true, ref: 'Country' }
    },
    nationality: { type: String, required: true, ref: 'Country' },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    injured: { type: Boolean, required: true },
    photo: { type: String, required: true },
    statistics: [{
        team: { type: String, required: true, ref: 'Team' },
        league: {
            id: { type: String, required: true, ref: 'League' },
            season: { type: Number, required: true }
        },
        games: {
            appearences: { type: Number, required: true },
            lineups: { type: Number, required: true },
            minutes: { type: Number, required: true },
            number: { type: Number, required: true },
            position: { type: String, required: true },
            rating: { type: Number, required: true },
            captain: { type: Boolean, required: true }
        },
        substitutes: {
            in: { type: Number, required: true },
            out: { type: Number, required: true },
            bench: { type: Number, required: true }
        },
        shots: {
            total: { type: Number, required: true },
            on: { type: Number, required: true }
        },
        goals: {
            total: { type: Number, required: true },
            conceded: { type: Number, required: true },
            assists: { type: Number, required: true },
            saves: { type: Number, required: true }
        },
        passes: {
            total: { type: Number, required: true },
            key: { type: Number, required: true },
            accuracy: { type: Number, required: true }
        },
        tackles: {
            total: { type: Number, required: true },
            blocks: { type: Number, required: true },
            interceptions: { type: Number, required: true }
        },
        duels: {
            total: { type: Number, required: true },
            won: { type: Number, required: true }
        },
        dribbles: {
            attempts: { type: Number, required: true },
            success: { type: Number, required: true },
            past: { type: Number, required: true }
        },
        fouls: {
            drawn: { type: Number, required: true },
            committed: { type: Number, required: true }
        },
        cards: {
            yellow: { type: Number, required: true },
            yellowred: { type: Number, required: true },
            red: { type: Number, required: true }
        },
        penalty: {
            won: { type: Number, required: true },
            commited: { type: Number, required: true },
            scored: { type: Number, required: true },
            missed: { type: Number, required: true },
            saved: { type: Number, required: true }
        }
    }]
}, { timestamps: true });

export default (mongoose.models.Player || mongoose.model<IPlayer>("Player", schema)) as Model<IPlayer>;

// {
//     "get": "players",
//     "parameters": {
//       "id": "276",
//       "season": "2019"
//     },
//     "errors": [],
//     "results": 1,
//     "paging": {
//       "current": 1,
//       "total": 1
//     },
//     "response": [
//       {
//         "player": {
//           "id": 276,
//           "name": "Neymar",
//           "firstname": "Neymar",
//           "lastname": "da Silva Santos Júnior",
//           "age": 28,
//           "birth": {
//             "date": "1992-02-05",
//             "place": "Mogi das Cruzes",
//             "country": "Brazil"
//           },
//           "nationality": "Brazil",
//           "height": "175 cm",
//           "weight": "68 kg",
//           "injured": false,
//           "photo": "https://media.api-sports.io/football/players/276.png"
//         },
//         "statistics": [
//           {
//             "team": {
//               "id": 85,
//               "name": "Paris Saint Germain",
//               "logo": "https://media.api-sports.io/football/teams/85.png"
//             },
//             "league": {
//               "id": 61,
//               "name": "Ligue 1",
//               "country": "France",
//               "logo": "https://media.api-sports.io/football/leagues/61.png",
//               "flag": "https://media.api-sports.io/flags/fr.svg",
//               "season": 2019
//             },
//             "games": {
//               "appearences": 15,
//               "lineups": 15,
//               "minutes": 1322,
//               "number": null,
//               "position": "Attacker",
//               "rating": "8.053333",
//               "captain": false
//             },
//             "substitutes": {
//               "in": 0,
//               "out": 3,
//               "bench": 0
//             },
//             "shots": {
//               "total": 70,
//               "on": 36
//             },
//             "goals": {
//               "total": 13,
//               "conceded": null,
//               "assists": 6,
//               "saves": 0
//             },
//             "passes": {
//               "total": 704,
//               "key": 39,
//               "accuracy": 79
//             },
//             "tackles": {
//               "total": 13,
//               "blocks": 0,
//               "interceptions": 4
//             },
//             "duels": {
//               "total": null,
//               "won": null
//             },
//             "dribbles": {
//               "attempts": 143,
//               "success": 88,
//               "past": null
//             },
//             "fouls": {
//               "drawn": 62,
//               "committed": 14
//             },
//             "cards": {
//               "yellow": 3,
//               "yellowred": 1,
//               "red": 0
//             },
//             "penalty": {
//               "won": 1,
//               "commited": null,
//               "scored": 4,
//               "missed": 1,
//               "saved": null
//             }
//           }
//         ]
//       }
//     ]
//   }