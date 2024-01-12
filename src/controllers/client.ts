import { Request, Response } from "express";
import Client from "../models/Clients";

export const registerClient = async (req: Request, res: Response) => {
    const {name, lastName, telephone, email, dateOfBirth} = req.body;

   try {
        const client = new Client({
            name,
            lastName,
            telephone,
            email,
            dateOfBirth
         })
         const savedClient = await client.save();
         res.status(201).json(savedClient);  
   } catch (error) {
        res.status(500).json({message: 'Failed to create the client'});
   }
}