import { Document, Schema, model, Types } from "mongoose";

interface IJournal extends Document {
  clientId: Types.ObjectId;
  treatmentId: Types.ObjectId;
  machineId?: Types.ObjectId;
  laserSettingsId: Types.ObjectId;
  diagnosisFormId?: Types.ObjectId;

  jDate: Date;

  seriesNumber?: number;
  seriesTotal?: number;

  price: number;
  discount?: number;
  totalPrice: number;

  area?: string;
  fitzpatrickType?: number;
  notes?: string;

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
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    treatmentId: {
      type: Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },
    machineId: {
      type: Schema.Types.ObjectId,
      ref: "Machine",
    },
    laserSettingsId: {
      type: Schema.Types.ObjectId,
      ref: "LaserSettings",
    },
    diagnosisFormId: {
      type: Schema.Types.ObjectId,
      ref: "DiagnosisForm",
    },
    jDate: {
      type: Date,
      required: true,
    },
    seriesNumber: {
      type: Number,
    },
    seriesTotal: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    totalPrice: {
      type: Number,
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
    notes: {
      type: String,
      trim: true,
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
      ref: "Staff",
      required: true,
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
