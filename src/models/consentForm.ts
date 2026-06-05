import { Document, Schema, model, Types } from "mongoose";

interface IConsentForm extends Document {
  clientId: Types.ObjectId;
  treatmentId: Types.ObjectId;
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
    treatmentId: {
      type: Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },
    consentText: {
      type: String,
      trim: true,
    },
    accepted: {
      type: Boolean,
    },
    signatureImage: {
      type: String,
      trim: true,
    },
    signedAt: {
      type: Date,
    }
  }, {
    timestamps: true,
  });

  const ConsentForm = model<IConsentForm>('ConstentForm', ConsentFormSchema);

  export default ConsentForm;
