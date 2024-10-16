import {Request, Response} from "express";
import Machine from "../models/machine";

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
        mServiceManufactureDate
    } = req.body;
if (!mName){
    return res.status(400).json({message: "machine name is required"});
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
            mServiceManufactureDate
        });
        const savedMachine = await machine.save();
        res.status(201).json(savedMachine);
    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const getAllMachines = async (req: Request, res: Response) => {
    try{
        const machine = await Machine.find();
        res.status(200).json(machine)
    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}


export const getMachine = async(req: Request, res: Response) => {
    const{id} = req.params;

    try {
        const machine = await Machine.findById(id);

        if(!machine) {
            return res.status(404).json({message: 'No machine found with this id: ' + id})
        }
        res.status(200).json(machine)
    } catch (error:any) {
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}


export const deleteMachine = async(req: Request, res: Response) => {
    const{id} = req.params;

    try {
        const machine = await Machine.findById(id);

        if(!machine) {
            return res.status(404).json({message: 'No machine found with this id: ' + id});
        }
        await machine.deleteOne()
        return res.status(200).json({message: 'Machine deleted'});

    } catch (error:any) {
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const editMachine = async (req: Request, res: Response) => {
    const {id} = req.params;
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
        mServiceManufactureDate} = req.body;

    try {
        const machine = await Machine.findById(req.params.id);

        if(!machine){
            return res.status(404).json({message: 'No machine found with this id: ' + id});
        }

        machine.mName = mName || machine.mName;
        machine.mManufactureCompany = mManufactureCompany || machine.mManufactureCompany;
        machine.mManufactureYear = mManufactureYear || machine.mManufactureYear;
        machine.mModelNumber = mModelNumber || machine.mModelNumber;
        machine.mSerialNumber = mSerialNumber || machine.mSerialNumber;
        machine.mDescription = mDescription || machine.mDescription;
        machine.mComments = mComments || machine.mComments;
        machine.mCommentsLokalService = mCommentsLokalService || machine.mCommentsLokalService;
        machine.mCommentsManufactureService = mCommentsManufactureService || machine.mCommentsManufactureService;
        machine.mStartLeasingDate= mStartLeasingDate || machine.mStartLeasingDate;
        machine.mFinishLeasingDate = mFinishLeasingDate || machine.mFinishLeasingDate;
        machine.mPurchaseDate = mPurchaseDate || machine.mPurchaseDate;
        machine.mServiceLokalDate = mServiceLokalDate || machine.mServiceLokalDate;
        machine.mServiceManufactureDate = mServiceManufactureDate || machine.mServiceManufactureDate;
        
        const updatedMachine = await machine.save()
        return res.status(200).json(updatedMachine)

    } catch (error:any) {
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}