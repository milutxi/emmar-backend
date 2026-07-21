import { Document, Schema, model } from "mongoose";

export interface IMachineSetupNode {
  label: string;
  children?: IMachineSetupNode[];
}

export interface IMachineParameterDefinition {
  label: string;
  unit?: string;
}
export interface IMachine extends Document {
  mName: string;
  mManufactureCompany: string;
  mManufactureYear: Date;
  mModelNumber: string;
  mSerialNumber: string;
  mDescription: string;

  acquisitionType: string;
  mStartLeasingDate: Date;
  mFinishLeasingDate: Date;
  mPurchaseDate: Date;

  mServiceLokalDate: Date;
  mServiceLokalNextDate: Date;
  mCommentsLokalService: string;

  mServiceManufactureDate: Date;
  mServiceManufactureNextDate: Date;
  mCommentsManufactureService: string;

  mComments: string;
  requiresTreatmentParameters: boolean;

  setupMenu: IMachineSetupNode[];
  parameterDefinitions: IMachineParameterDefinition[];

  createdAt: Date;
  updatedAt: Date;
}

const MachineSetupNodeSchema = new Schema({
  label: {
    type: String,
    required: true,
    trim: true,
  },
});

MachineSetupNodeSchema.add({
  children: [MachineSetupNodeSchema],
});

const MachineParameterDefinitionSchema = new Schema({
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
});

const MachineSchema = new Schema<IMachine>(
  {
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
    mCommentsLokalService: {
      type: String,
      trim: true,
    },
    mCommentsManufactureService: {
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
    },
    mServiceLokalNextDate: {
      type: Date,
      trim: true,
    },
    mServiceManufactureNextDate: {
      type: Date,
      trim: true,
    },
    requiresTreatmentParameters: {
      type: Boolean,
      default: false,
      required: true,
    },
    acquisitionType: {
      type: String,
      enum: ["leasing", "purchase"],
      required: true,
    },
    setupMenu: {
      type: [MachineSetupNodeSchema],
      default: [],
    },
    parameterDefinitions: {
      type: [MachineParameterDefinitionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Machine = model<IMachine>("Machine", MachineSchema);

export default Machine;
