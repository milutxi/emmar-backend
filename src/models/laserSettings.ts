import { Document, Schema, model } from "mongoose";

interface ITreatmentParameters extends Document {
  wavelength?: string; // våglängd
  pulseMode?: string; // skottläge
  energyDensity?: number; // energitäthet
  pulseEnergy?: number; // mJ
  spotSize?: number; // mm
  frequency?: number; // Hz
  pulseDuration?: number; // ms
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
      type: Number,
    },
    pulseEnergy: {
      type: Number,
    },
    spotSize: {
      type: Number,
    },
    frequency: {
      type: Number,
    },
    pulseDuration: {
      type: Number,
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
  "LaserSettings",
 TreatmentParametersSchema,
);

export default TreatmentParameters;
