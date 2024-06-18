import { Document, Schema, model } from "mongoose";

interface IDiagnosis extends Document {
    dname: string;
    // flag: boolean;
    // dcomment?: string;
    createdAt: Date;
    updatedAt: Date;
}

const DiagnosisSchema = new Schema<IDiagnosis>({
    dname: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    // flag: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },
    // dcomment: {
    //     type: String,
    //     trim: true,
    // },
}, {
    timestamps: true
});

const Diagnosis = model<IDiagnosis>('Diagnosis', DiagnosisSchema);

export default Diagnosis;