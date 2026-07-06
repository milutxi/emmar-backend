import { Request, Response } from "express";
import MedicalHistory from "../models/medicalHistory";

export const createMedicalHistory = async (req: Request, res: Response) => {
  try {
    const {
      _id,
      id,
      version: incomingVersion,
      isLatest: incomingIsLatest,
      createdAt,
      updatedAt,
      __v,
      clientId,
      ...medicalHistoryData
    } = req.body;

    if (!clientId) {
      return res.status(400).json({
        message: "clientId is required",
      });
    }

    // 1. Find latest medical history

    const latestMedicalHistory = await MedicalHistory.findOne({
      clientId,
      isLatest: true,
    }).sort({ version: -1 });

    // 2. Calculate the new version number

    const nextVersion = latestMedicalHistory
      ? latestMedicalHistory.version + 1
      : 1;

    // if (latestMedicalHistory) {
    //   version = (latestMedicalHistory.version ?? 0) + 1;

    //   latestMedicalHistory.isLatest = false;
    //   await latestMedicalHistory.save();
    // }

    // 3. Create new version

    const savedMedicalHistory = await MedicalHistory.create({
      ...medicalHistoryData,
      clientId,
      version: nextVersion,
      isLatest: true,
    });

    await MedicalHistory.updateMany(
      {
        clientId,
        _id: { $ne: savedMedicalHistory._id },
      },
      {
        $set: { isLatest: false },
      },
    );

    // 4. Return it

    return res.status(201).json(savedMedicalHistory);
  } catch (error: any) {
    console.error("Create medical history error:", error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getLatestMedicalHistory = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    const medicalHistory = await MedicalHistory.findOne({
      clientId,
      isLatest: true,
    });

    return res.status(200).json(medicalHistory);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
