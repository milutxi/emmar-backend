import { Request, Response } from "express";
import TreatmentParameters from "../models/treatmentParameters";

export const createJournal = async (req: Request, res: Response) => {
  //console.log(req.body);

  const treatments = req.body.treatments;

  for (const session of treatments) {
    if (session.treatmentParameters) {
      const savedParameters = await TreatmentParameters.create(
        session.treatmentParameters,
      );

      session.treatmentParametersId = savedParameters._id;

      delete session.treatmentParameters;
    }
  }

  console.log(treatments);

  res.status(200).json({
    message: "Received",
  });
};
