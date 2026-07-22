import { Request, Response } from "express";
import TreatmentParameters from "../models/treatmentParameters";
import Journal from "../models/journal";

const getMachineIdsFromSettings = (session: any) => {
  if (!Array.isArray(session.machineSettings)) {
    return [];
  }

  return session.machineSettings
    .map((setting: any) => setting.machineId)
    .filter(Boolean);
};

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

      const machineIdsFromSettings = getMachineIdsFromSettings(session);

      if (machineIdsFromSettings.length > 0) {
        session.machineIds = machineIdsFromSettings;
      }
    }

    const journal = await Journal.create({
      clientId: req.body.clientId,
      jDate: req.body.jDate,
      treatments,

      medicalHistoryId: req.body.medicalHistoryId || undefined,
      consentFormId: req.body.consentFormId || undefined,

      medicalHistoryReviewed: Boolean(req.body.medicalHistoryId),
      consentConfirmed: Boolean(req.body.consentFormId),

      changesReported: false,
      signedAt: new Date(),
    });

    res.status(201).json(journal);
  } catch (error: any) {
    console.error("Create journal error:", error);

    return res.status(500).json({
      message: "Could not create journal",
      error: error.message,
    });
  }
};

export const getJournalsByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    const journals = await Journal.find({ clientId })
      .sort({ jDate: -1, createdAt: -1 })
      .populate("treatments.treatmentId")
      .populate("treatments.machineIds")
      .populate("treatments.treatmentParametersId")
      .populate("medicalHistoryId")
      .populate("consentFormId")
      .populate("treatments.machineSettings.machineId");
    return res.status(200).json(journals);
  } catch (error: any) {
    console.error("Get journals by client error:", error);

    return res.status(500).json({
      message: "Could not get treatment sessions for client",
      error: error.message,
    });
  }
};

export const getAllJournals = async (req: Request, res: Response) => {
  try {
    const journals = await Journal.find()
      .sort({ jDate: -1, createdAt: -1 })
      .populate("clientId")
      .populate("treatments.treatmentId")
      .populate("treatments.machineIds")
      .populate("treatments.treatmentParametersId")
      .populate("medicalHistoryId")
      .populate("consentFormId")
      .populate("treatments.machineSettings.machineId");
    return res.status(200).json(journals);
  } catch (error: any) {
    console.error("Get all journals error:", error);

    return res.status(500).json({
      message: "Could not get journals",
      error: error.message,
    });
  }
};

export const updateJournal = async (req: Request, res: Response) => {
  try {
    const { journalId } = req.params;

    const updateData: any = {};

    if (req.body.jDate !== undefined) {
      updateData.jDate = req.body.jDate;
    }

    if (req.body.treatments !== undefined) {
      updateData.treatments = await prepareJournalTreatmentsForUpdate(
        req.body.treatments,
      );
    }

    if (req.body.medicalHistoryId !== undefined) {
      updateData.medicalHistoryId = req.body.medicalHistoryId || undefined;
      updateData.medicalHistoryReviewed = Boolean(req.body.medicalHistoryId);
    }

    if (req.body.consentFormId !== undefined) {
      updateData.consentFormId = req.body.consentFormId || undefined;
      updateData.consentConfirmed = Boolean(req.body.consentFormId);
    }

    const updatedJournal = await Journal.findByIdAndUpdate(
      journalId,
      { $set: updateData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    )
      .populate("treatments.treatmentId")
      .populate("treatments.machineIds")
      .populate("treatments.treatmentParametersId")
      .populate("medicalHistoryId")
      .populate("consentFormId")
      .populate("treatments.machineSettings.machineId");
    if (!updatedJournal) {
      return res.status(404).json({
        message: "Journal session not found",
      });
    }

    return res.status(200).json(updatedJournal);
  } catch (error: any) {
    console.error("Update journal error:", error);

    return res.status(500).json({
      message: "Could not update journal session",
      error: error.message,
    });
  }
};

const prepareJournalTreatmentsForUpdate = async (treatments: any[]) => {
  const preparedTreatments = [];

  for (const session of treatments) {
    const treatmentId =
      typeof session.treatmentId === "object"
        ? session.treatmentId._id
        : session.treatmentId;

    const machineSettings = Array.isArray(session.machineSettings)
      ? session.machineSettings
          .map((setting: any) => {
            const machineId =
              typeof setting.machineId === "object"
                ? setting.machineId._id
                : setting.machineId;

            return {
              machineId,
              setupPath: Array.isArray(setting.setupPath)
                ? setting.setupPath
                : [],
              parameters: Array.isArray(setting.parameters)
                ? setting.parameters.map((parameter: any) => ({
                    label: parameter.label,
                    unit: parameter.unit || "",
                    value: parameter.value || "",
                  }))
                : [],
              comment: setting.comment || "",
            };
          })
          .filter((setting: any) => setting.machineId)
      : [];

    const machineIdsFromOldField = Array.isArray(session.machineIds)
      ? session.machineIds.map((machine: any) =>
          typeof machine === "object" ? machine._id : machine,
        )
      : [];

    const machineIds =
      machineSettings.length > 0
        ? machineSettings.map((setting: any) => setting.machineId)
        : machineIdsFromOldField;

    const preparedSession: any = {
      treatmentId,
      machineIds,
      machineSettings,
      duration: session.duration,
      price: session.price,
      discount: session.discount,
      totalPrice: session.totalPrice,
      notes: session.notes,
    };

    const existingTreatmentParametersId =
      typeof session.treatmentParametersId === "object"
        ? session.treatmentParametersId._id
        : session.treatmentParametersId;

    const treatmentParametersData =
      session.treatmentParameters ||
      (typeof session.treatmentParametersId === "object"
        ? session.treatmentParametersId
        : null);

    if (treatmentParametersData) {
      const { _id, createdAt, updatedAt, __v, ...cleanParameters } =
        treatmentParametersData;

      if (existingTreatmentParametersId) {
        await TreatmentParameters.findByIdAndUpdate(
          existingTreatmentParametersId,
          cleanParameters,
          {
            returnDocument: "after",
            runValidators: true,
          },
        );

        preparedSession.treatmentParametersId = existingTreatmentParametersId;
      } else {
        const savedParameters =
          await TreatmentParameters.create(cleanParameters);

        preparedSession.treatmentParametersId = savedParameters._id;
      }
    } else if (existingTreatmentParametersId) {
      preparedSession.treatmentParametersId = existingTreatmentParametersId;
    }

    preparedTreatments.push(preparedSession);
  }

  return preparedTreatments;
};
