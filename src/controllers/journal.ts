import { Request, Response } from "express";
import TreatmentParameters from "../models/treatmentParameters";
import Journal from "../models/journal";
export const createJournal = async (req: Request, res: Response) => {
  //console.log(req.body);
  try {
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

    // console.log(treatments);
    // res.status(200).json({
    //   message: "Received",
    // });

    const journal = await Journal.create({
      clientId: req.body.clientId,
      jDate: req.body.jDate,
      treatments,
    });

    res.status(201).json(journal);
    
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not create journal",
    });
  }
};
