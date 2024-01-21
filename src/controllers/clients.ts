import { Request, Response } from "express";
import Client from "../models/client";

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

export const getAllClients = async (req: Request, res: Response) => {
     const clients = await Client.find();

     res.status(200).json(clients)
}