import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import Client from "./models/Clients";

const app = express()

//middleware
app.use(express.json());

//create handlers
app.post('/registerClient', async (req, res) => {
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
});

//MongoDB Connection through .env file to hide the URL
const mongoURL = process.env.DB_URL;

if(!mongoURL) throw Error("Missing db url");

mongoose.connect(mongoURL)
    .then(() => {
        const port= parseInt(process.env.PORT || '3000');
        app.listen(port, () => {
            console.log('Hola Sheila, Server listening on port ' + port);
        })
    })
