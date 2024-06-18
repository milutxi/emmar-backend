import {Request, Response, response} from "express";
import Treatment from "../models/treatment";

export const registerTreatment = async (req: Request, res: Response) => {
    const {tname, tdescription, tduration, tprice} = req.body;

    if(!tname){
        return res.status(400).json({message: "treatment name is required"});
    }

    try{
        const treatment = new Treatment({
            tname,
            tdescription,
            tduration,
            tprice
        });

        const savedTreatment = await treatment.save();
        res.status(201).json(savedTreatment);

    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const getAllTreatments = async (req: Request, res: Response) => {
    try{
        const treatment = await Treatment.find();
        res.status(200).json(treatment)
    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const getTreatment = async(req: Request, res: Response) => {
    const{id} = req.params;

    try{
        const treatment = await Treatment.findById(id);

        if(!treatment) {
            return res.status(404).json({message: 'No treatment found with this id: ' + id})
        }
        res.status(200).json(treatment)
    }catch(error:any){
        return res. status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const deleteTreatment = async(req: Request, res: Response) => {
    const{id} = req.params;

    try{
        const treatment = await Treatment.findById(id);

        if(!treatment) {
            return res.status(404).json({message: 'No treatment found with this id: ' + id});
        }
        await treatment.deleteOne()
        return res.status(200).json({message: 'Treatment deleted'});

    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const editTreatment = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {tname, tdescription, tduration, tprice} = req.body;

    try{
        const treatment = await Treatment.findById(req.params.id);

        if(!treatment){
            return res.status(404).json({message: 'No treatment found with this id: ' + id});
        }

        treatment.tname = tname || treatment.tname;
        treatment.tdescription = tdescription || treatment.tdescription;
        treatment.tduration = tduration || treatment.tduration;
        treatment.tprice = tprice || treatment.tprice;

        const updatedTreatment = await treatment.save()
        return res.status(200).json(updatedTreatment)

    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }

}