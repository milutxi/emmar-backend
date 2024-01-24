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

export const getClient = async (req: Request, res: Response) => {
     const {id} = req.params;

     const client = await Client.findById(id);  

     if(!client) {
          return res.status(404).json({message: 'No client found with this id: ' + id})
     }

     res.status(200).json(client)
}

export const deleteClient = async (req: Request, res: Response) => {
     const {id} = req.params;

     try{
          const client = await Client.findById(id);

          if(!client) {
               return res.status(404).json({message: 'No client found with this id: ' + id});
          }

          await client.deleteOne()

          return res.status(200).json({message: 'Client deleted'});
     }catch(error){
          return res.status(500).json({message: 'Internal Server Error'});
     }

}