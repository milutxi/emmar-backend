import { Document, Schema, Types, model } from "mongoose";

// interface IClientDiagnos {
//     diagnos: Types.ObjectId;
//     comment: string;
// }
interface IClient extends Document {
    name: string;
    lastName: string;
    telephone: string;
    email: string;
    dateOfBirth: Date;
    
    createdAt: Date;
    updatedAt: Date;
}

const ClientSchema = new Schema<IClient>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    telephone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false,
        trim: true,
    },
   
}, {
    timestamps: true
});

const Client = model<IClient>('Client', ClientSchema);

export default Client;

