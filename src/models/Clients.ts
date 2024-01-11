import { Document, Schema, model } from "mongoose";

interface IClient extends Document {
    name: string;
    lastName: string;
    telephone: number;
    email: string;
    dateOfBirth: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ClientSchema = new Schema<IClient>({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    telephone: {
        type: Number,
    },
    email: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    }
}, {
    timestamps: true
});

const Client = model<IClient>('Client', ClientSchema);

export default Client;

