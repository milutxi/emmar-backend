import { Document, Schema, model } from "mongoose";



interface IMachine extends Document {
    mName: string;
    mManufactureCompany: string;
    mManufactureYear: Date;
    mModelNumber: string;
    mSerialNumber: string;
    mDescription: string;
    mComments: string;
    mStartLeasingDate: Date;
    mFinishLeasingDate: Date;
    mPurchaseDate: Date;
    mServiceLokalDate: Date;
    mServiceManufactureDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const MachineSchema = new Schema<IMachine>({
    mName: {
        type: String,
        required: true,
        trim: true,
    },  
    mManufactureCompany: {
        type: String,
        trim: true,
    },
    mManufactureYear: {
        type: Date,
        trim: true,
    },
    mModelNumber: {
        type: String,
        trim: true,
    },
    mSerialNumber: {
        type: String,
        trim: true,
    },
    mDescription: {
        type: String,
        trim: true,
    },
    mComments: {
        type: String,
        trim: true,
    },
    mStartLeasingDate: {
        type: Date,
        trim: true,
    },
    mFinishLeasingDate: {
        type: Date,
        trim: true,
    },
    mPurchaseDate: {
        type: Date,
        trim: true,
    }, 
    mServiceLokalDate: {
        type: Date,
        trim: true,
    }, 
    mServiceManufactureDate: {
        type: Date,
        trim: true,
    } 
}, {
    timestamps: true
});

const Machine = model<IMachine>('Machine', MachineSchema);

export default Machine;