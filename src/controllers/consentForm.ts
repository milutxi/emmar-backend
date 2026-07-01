import { Request, Response } from "express";
import ConsentForm from "../models/consentForm";

export const createConsentForm = async (req: Request, res: Response) => {

  try {
    const savedConsentForm = await ConsentForm.create(req.body);

    return res.status(201).json(savedConsentForm);

  }catch(error:any){
    return res.status(500).json({message: 'Internal Server Error', error: error.message});
  }
}

export const getAllConsentForms = async (req: Request, res: Response) => {
  try{
    const consentForms = await ConsentForm.find();
    return res.status(200).json(consentForms)

  }catch(error:any){
    return res.status(500).json({message: 'Internal Server Error', error: error.message});

  }
}

