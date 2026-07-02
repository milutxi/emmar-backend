import { Request, Response } from "express";
import MedicalHistory from "../models/medicalHistory";

export const createMedicalHistory = async (req: Request, res: Response) => {
  try{

   const { clientId } = req.body;

    // 1. Find latest medical history

    const latestMedicalHistory = await MedicalHistory.findOne({
      clientId,
      isLatest: true,
    }).sort({ version: -1});

    // 2. Calculate the new version number
    let version = 1;

    if(latestMedicalHistory) {
      version = latestMedicalHistory.version + 1;
    }
    
   
    // 3. Create new version
    
    const savedMedicalHistory = await MedicalHistory.create({
      ...req.body,
      version,
      isLatest: true,
    });

    // 4. Return it
    
    return res.status(201).json(savedMedicalHistory);








  }catch(error:any){
    return res.status(500).json({message: 'Internal Server Error', error: error.message});
  }
}


export const getLatestMedicalHistory = async (req: Request, res: Response) => {
  try{
    const { clientId } = req.params; 

    const medicalHistory = await MedicalHistory.findOne({
      clientId,
      isLatest: true,
    });

    return res.status(200).json(medicalHistory);

    }catch(error:any) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });

  }
};