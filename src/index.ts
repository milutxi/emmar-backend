import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as clientController from "./controllers/clients";

const app = express();

//middleware

app.use(cors());
app.use(express.json());

//create handlers
app.post("/clients", clientController.registerClient);
app.get("/clients", clientController.getAllClients);
app.get("/clients/:id", clientController.getClient);
app.delete("/clients/:id", clientController.deleteClient);
app.patch("/clients/:id", clientController.editClient);

app.get("/", (req, res) => {
  res.json({ mssg: "welcome to the app" });
});

//MongoDB Connection through .env file to hide the URL
const mongoURL = process.env.DB_URL;

if (!mongoURL) throw Error("Missing db url");

mongoose.connect(mongoURL).then(() => {
  const port = parseInt(process.env.PORT || "3000");
  app.listen(port, () => {
    console.log("Hola Sheila, Server listening on port " + port);
  });
});
