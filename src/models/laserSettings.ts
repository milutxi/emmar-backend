import { Document, Schema, model } from "mongoose";

interface ILaserSettings extends Document {
  wavelength?: string; // våglängd
  pulseMode?: string; // skottläge
  energyDensity?: number; // energitäthet
  pulseEnergy?: number; // mJ
  spotSize?: number; // mm
  frequency?: number; // Hz
  pulseDuration?: number; // ms
  coolingUsed?: boolean;
  laserComment?: string;

  createdAt: Date;
  updatedAt: Date;
}

const LaserSettingsSchema = new Schema<ILaserSettings>(
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
    laserComment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const LaserSettings = model<ILaserSettings>(
  "LaserSettings",
  LaserSettingsSchema,
);

export default LaserSettings;
