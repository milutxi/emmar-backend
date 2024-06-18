import { Document, Schema, model } from "mongoose";

interface ITreatment extends Document {
    tname: string;
    tdescription: string;
    tduration: number;
    tprice: number;
    createdAt: Date;
    updatedAt: Date;
}

const TreatmentSchema = new Schema<ITreatment>({
    tname: {
        type: String,
        required: true,
        trim: true,
    },
    tdescription: {
        type: String,
        trim: true,
    },
    tduration: {
        type: Number,
        trim: true,
    },
    tprice: {
        type: Number,
        trim: true,
    }
},{
    timestamps: true
});

const Treatment = model<ITreatment>('Treatment', TreatmentSchema);

export default Treatment;