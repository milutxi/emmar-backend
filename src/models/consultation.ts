import { Document, Schema, model, Types } from "mongoose";

interface IConsultation extends Document {
  clientId: Types.ObjectId;
  consultationTitle: string;
  consultationText: string,
  consultationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  consultationTitle: {
    type: String,
    required: true,
    trim: true,
  },
  consultationText: {
    required: true,
    type: String,
    trim: true,
  },
  consultationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
},{
  timestamps: true
});

const Consultation = model<IConsultation>('Consultation', ConsultationSchema);

export default Consultation;