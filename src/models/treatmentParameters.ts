import { Document, Schema, model } from "mongoose";

interface ITreatmentParameters extends Document {
  wavelength?: string; // våglängd
  pulseMode?: string; // skottläge
  energyDensity?: string; // energitäthet
  pulseEnergy?: string; // mJ
  spotSize?: string; // mm
  frequency?: string; // Hz
  pulseDuration?: string; // ms
  coolingUsed?: boolean;
  tpComment?: string;

  createdAt: Date;
  updatedAt: Date;
}

const TreatmentParametersSchema = new Schema<ITreatmentParameters>(
  {
    wavelength: {
      type: String,
      trim: true,
    },
    pulseMode: {
      type: String,
      trim: true,
    },
    energyDensity: {
      type: String,
      trim: true,
    },
    pulseEnergy: {
      type: String,
      trim: true,
    },
    spotSize: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      trim: true,
    },
    pulseDuration: {
      type: String,
      trim: true,
    },
    coolingUsed: {
      type: Boolean,
    },
    tpComment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const TreatmentParameters = model<ITreatmentParameters>(
  "TreatmentParameters",
  TreatmentParametersSchema,
);

export default TreatmentParameters;
