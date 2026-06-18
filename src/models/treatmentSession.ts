// this interface does not need model or document because it only exist inside Journal, it was created just for simplicy (not overextend journal.ts)

import { Schema, Types } from "mongoose";

export interface ITreatmentSession {
  treatmentId: Types.ObjectId;
  machineIds?: Types.ObjectId[];
  treatmentParametersId?: Types.ObjectId;
  duration: number;
  price: number;
  discount?: number;
  totalPrice: number;
  notes?: string;
}

export const TreatmentSessionSchema = new Schema<ITreatmentSession>(
  {
    treatmentId: {
      type: Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },
    machineIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Machine",
      },
    ],
    treatmentParametersId: {
      type: Schema.Types.ObjectId,
      ref: "TreatmentParameters",
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);


