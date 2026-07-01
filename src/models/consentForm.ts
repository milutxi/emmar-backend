import { Document, Schema, model, Types } from "mongoose";

export interface IConsentForm extends Document {
  clientId: Types.ObjectId;
   treatmentIds: Types.ObjectId[];
  consentText: string;
  accepted: boolean;
  signatureImage: string;
  signedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const ConsentFormSchema = new Schema<IConsentForm>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    treatmentIds: [
      {
      type: Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
      },
    ],
    consentText: {
      type: String,
      required: true,
      trim: true,
    },
    accepted: {
      type: Boolean,
      required: true,
    },
    signatureImage: {
      type: String,
      required: true,
      trim: true,
    },
    signedAt: {
      type: Date,
      required: true,
    }
  }, {
    timestamps: true,
  });

  const ConsentForm = model<IConsentForm>('ConsentForm', ConsentFormSchema);

  export default ConsentForm;
