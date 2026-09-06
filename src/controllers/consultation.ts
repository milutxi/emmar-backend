import { Request, Response } from "express";
import Consultation from "../models/consultation";

export const registerConsultation = async (req: Request, res: Response) => {
  const { clientId, consultationTitle, consultationText, consultationDate } =
    req.body;

  try {
    if (!clientId || !consultationTitle || !consultationText) {
      return res.status(400).json({
        message:
          "clientId, consultationTitle and consultationText are required",
      });
    }

    const consultation = new Consultation({
      clientId,
      consultationTitle,
      consultationText,
      consultationDate: consultationDate || new Date(),
    });

    const savedConsultation = await consultation.save();
    res.status(201).json(savedConsultation);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getConsultationsByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    if(!clientId) {
      return res.status(400).json({
        message: "clientId is required",
      });
    }

    const consultations = await Consultation.find({
      clientId,
    }).sort({
      consultationDate: -1,
      createdAt: -1,
    });
    
    return res.status(200).json(consultations);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
