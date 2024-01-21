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
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    telephone: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
});

const Client = model<IClient>('Client', ClientSchema);

export default Client;

