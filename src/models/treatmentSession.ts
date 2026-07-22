// this interface does not need model or document because it only exist inside Journal, it was created just for simplicy (not overextend journal.ts)

import { Schema, Types } from "mongoose";

export interface IMachineParameterValue {
  label: string;
  unit?: string;
  value: string;
}

export interface IMachineSetting {
  machineId: Types.ObjectId;
  setupPath?: string[];
  parameters?: IMachineParameterValue[];
  comment?: string;
}

export interface ITreatmentSession {
  treatmentId: Types.ObjectId;
  machineIds?: Types.ObjectId[];
  treatmentParametersId?: Types.ObjectId;

  machineSettings?: IMachineSetting[];

  duration: number;
  price: number;
  discount?: number;
  totalPrice: number;
  notes?: string;
}

const MachineParameterValueSchema = new Schema<IMachineParameterValue>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      trim: true,
      default: "",
    },
    value: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const MachineSettingSchema = new Schema<IMachineSetting>(
  {
    machineId: {
      type: Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    setupPath: {
      type: [String],
      default: [],
    },
    parameters: {
      type: [MachineParameterValueSchema],
      default: [],
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  },
);

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
    machineSettings: {
      type: [MachineSettingSchema],
      default: [],
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
