import {Request, Response} from "express";
import Diagnos from "../models/diagnos";

export const registerDiagnos = async (req: Request, res: Response) => {
    const {dname} = req.body;
if (!dname){
    return res.status(400).json({message: "dname is required"});
}
    try {
        const diagnos = new Diagnos({
            dname
        });
        const savedDiagnos = await diagnos.save();
        res.status(201).json(savedDiagnos);
    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const getAllDiagnos = async (req: Request, res: Response) => {
    try{
        const diagnos = await Diagnos.find();
        res.status(200).json(diagnos)
    }catch(error:any){
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const getDiagnos = async(req: Request, res: Response) => {
    const{id} = req.params;

    try {
        const diagnos = await Diagnos.findById(id);

        if(!diagnos) {
            return res.status(404).json({message: 'No diagnos found with this id: ' + id})
        }
        res.status(200).json(diagnos)
    } catch (error:any) {
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const deleteDiagnos = async(req: Request, res: Response) => {
    const{id} = req.params;

    try {
        const diagnos = await Diagnos.findById(id);

        if(!diagnos) {
            return res.status(404).json({message: 'No diagnos found with this id: ' + id});
        }
        await diagnos.deleteOne()
        return res.status(200).json({message: 'Diagnos deleted'});

    } catch (error:any) {
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const editDiagnos = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {dname} = req.body;

    try {
        const diagnos = await Diagnos.findById(req.params.id);

        if(!diagnos){
            return res.status(404).json({message: 'No diagnos found with this id: ' + id});
        }

        diagnos.dname = dname || diagnos.dname;

        const updatedDiagnos = await diagnos.save()
        return res.status(200).json(updatedDiagnos)
        
    } catch (error:any) {
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}