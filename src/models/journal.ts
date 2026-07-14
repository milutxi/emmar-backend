import { Document, Schema, model, Types } from "mongoose";
import { ITreatmentSession, TreatmentSessionSchema } from "./treatmentSession";

interface IJournal extends Document {
  jDate: Date;
  clientId: Types.ObjectId;

  treatments: ITreatmentSession[];

  medicalHistoryId: Types.ObjectId;
  consentFormId: Types.ObjectId;

  area?: string;
  fitzpatrickType?: number;

  medicalHistoryReviewed: boolean;
  consentConfirmed: boolean;

  changesReported: boolean;
  changesDescription?: string;

  beforePhotos?: string[];
  afterPhotos?: string[];

  performedBy: Types.ObjectId;
  signedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const JournalSchema = new Schema<IJournal>(
  {
    jDate: {
      type: Date,
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    treatments: [TreatmentSessionSchema],

    medicalHistoryId: {
      type: Schema.Types.ObjectId,
      ref: "MedicalHistory",
    },
    consentFormId: {
      type: Schema.Types.ObjectId,
      ref: "ConsentForm",
    },

    area: {
      type: String,
      trim: true,
    },
    fitzpatrickType: {
      type: Number,
      min: 1,
      max: 6,
    },
    medicalHistoryReviewed: {
      type: Boolean,
    },
    consentConfirmed: {
      type: Boolean,
    },
    changesReported: {
      type: Boolean,
    },
    changesDescription: {
      type: String,
      trim: true,
    },
    beforePhotos: [
      {
        type: String,
      },
    ],
    afterPhotos: [
      {
        type: String,
      },
    ],
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // need to change to required true
    },
    signedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Journal = model<IJournal>("Journal", JournalSchema);

export default Journal;
