import { Document, Schema, model, Types } from "mongoose";

interface IMedicalHistory extends Document {
  clientId: Types.ObjectId;
  pregnant?: boolean;
  breastfeeding?: boolean;
  diabetic?: boolean;
  skinInfection?: boolean;
  autoimmuneDisease?: boolean;
  epilepsy?: boolean;
  pacemaker?: boolean;
  cancer?: boolean;
  hepatitis?: boolean;
  tattoos?: boolean;
  permanentFillers?: boolean;
  hypersensitiveSkin?: boolean;
  skinDiseases?: boolean;
  heartProblems?: boolean;
  venerealDiseases?: boolean;
  hormonalChanges?: boolean;
  medication?: boolean;
  medicationDetails?: string;
  omega3?: boolean;
  allergies?: boolean;
  allergyDetails?: string;
  anesthesiaReaction?: boolean;
  anesthesiaReactionDetails?: string;
  anaphylaxis?: boolean;
  anaphylaxisDetails?: string;
  bloodThinners?: boolean;
  bloodThinnerDetails?: string;
  hypertrophicScarring?: boolean;
  hypertrophicScarringDetails?: string;

  otherConditions?: string;
  mhnotes?: string;
  consentAccepted?: boolean;
  signedAt?: Date;
  signatureImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MedicalHistorySchema = new Schema<IMedicalHistory>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    pregnant: {
      type: Boolean,
    },
    breastfeeding: {
      type: Boolean,
    },
    diabetic: {
      type: Boolean,
    },
    skinInfection: {
      type: Boolean,
    },
    autoimmuneDisease: {
      type: Boolean,
    },
    epilepsy: {
      type: Boolean,
    },
    pacemaker: {
      type: Boolean,
    },
    cancer: {
      type: Boolean,
    },
    hepatitis: {
      type: Boolean,
    },
    tattoos: {
      type: Boolean,
    },
    permanentFillers: {
      type: Boolean,
    },
    hypersensitiveSkin: {
      type: Boolean,
    },
    skinDiseases: {
      type: Boolean,
    },
    heartProblems: {
      type: Boolean,
    },
    venerealDiseases: {
      type: Boolean,
    },
    hormonalChanges: {
      type: Boolean,
    },
    medication: {
      type: Boolean,
    },
    medicationDetails: {
      type: String,
      trim: true,
    },
    omega3: {
      type: Boolean,
    },
    allergies: {
      type: Boolean,
    },
    allergyDetails: {
      type: String,
      trim: true,
    },
    anesthesiaReaction: {
      type: Boolean,
    },
    anesthesiaReactionDetails: {
      type: String,
      trim: true,
    },
    anaphylaxis: {
      type: Boolean,
    },
    anaphylaxisDetails: {
      type: String,
      trim: true,
    },
    bloodThinners: {
      type: Boolean,
    },
    bloodThinnerDetails: {
      type: String,
      trim: true,
    },
    hypertrophicScarring: {
      type: Boolean,
    },
    hypertrophicScarringDetails: {
      type: String,
      trim: true,
    },
    otherConditions: {
      type: String,
      trim: true,
    },
    mhnotes: {
      type: String,
      trim: true,
    },
    consentAccepted: {
      type: Boolean,
      default: false,
    }, 
    signedAt: {
      type: Date,
    },
    signatureImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const MedicalHistory = model<IMedicalHistory>(
  "MedicalHistory",
  MedicalHistorySchema,
);

export default MedicalHistory;
