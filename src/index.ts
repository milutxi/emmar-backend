import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';

const app = express()

//middleware
app.use(express.json());

//create handlers
app.use('/registerClient', (req, res) => {
   const {name, lastName, telephone, email, dateOfBirth} = req.body;

   res.send({name, lastName, telephone, email, dateOfBirth});   
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
