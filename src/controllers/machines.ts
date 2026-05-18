import { Request, Response } from "express";
import Machine from "../models/machine";

/**
 * CREATE MACHINE
 */
export const registerMachine = async (req: Request, res: Response) => {
  const {
    mName,
    mManufactureCompany,
    mManufactureYear,
    mModelNumber,
    mSerialNumber,
    mDescription,
    mComments,
    mCommentsLokalService,
    mCommentsManufactureService,
    mStartLeasingDate,
    mFinishLeasingDate,
    mPurchaseDate,
    mServiceLokalDate,
    mServiceManufactureDate,
  } = req.body;

  if (!mName || mName.trim() === "") {
    return res.status(400).json({ message: "Machine name is required" });
  }

  try {
    const machine = new Machine({
      mName,
      mManufactureCompany,
      mManufactureYear,
      mModelNumber,
      mSerialNumber,
      mDescription,
      mComments,
      mCommentsLokalService,
      mCommentsManufactureService,
      mStartLeasingDate,
      mFinishLeasingDate,
      mPurchaseDate,
      mServiceLokalDate,
      mServiceManufactureDate,
    });

    const savedMachine = await machine.save();

    return res.status(201).json(savedMachine);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * GET ALL MACHINES
 */
export const getAllMachines = async (_req: Request, res: Response) => {
  try {
    const machines = await Machine.find();
    return res.status(200).json(machines);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE MACHINE
 */
export const getMachine = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const machine = await Machine.findById(id);

    if (!machine) {
      return res
        .status(404)
        .json({ message: "No machine found with id: " + id });
    }

    return res.status(200).json(machine);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * DELETE MACHINE
 */
export const deleteMachine = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const machine = await Machine.findById(id);

    if (!machine) {
      return res
        .status(404)
        .json({ message: "No machine found with id: " + id });
    }

    await machine.deleteOne();

    return res.status(200).json({ message: "Machine deleted" });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * EDIT MACHINE (CLEAN & SAFE VERSION)
 */
export const editMachine = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const machine = await Machine.findById(id);

    if (!machine) {
      return res
        .status(404)
        .json({ message: "No machine found with id: " + id });
    }

    // whitelist of allowed fields (prevents accidental/malicious updates)
    const allowedFields = [
      "mName",
      "mManufactureCompany",
      "mManufactureYear",
      "mModelNumber",
      "mSerialNumber",
      "mDescription",
      "mComments",
      "mCommentsLokalService",
      "mCommentsManufactureService",
      "mStartLeasingDate",
      "mFinishLeasingDate",
      "mPurchaseDate",
      "mServiceLokalDate",
      "mServiceManufactureDate",
    ] as const;

    allowedFields.forEach((field) => {
      const value = req.body[field];

      if (value !== undefined) {
        // @ts-ignore (safe because we control fields)
        machine[field] = value;
      }
    });

    const updatedMachine = await machine.save();

    return res.status(200).json(updatedMachine);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};